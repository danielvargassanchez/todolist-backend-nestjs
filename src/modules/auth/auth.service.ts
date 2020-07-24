import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO, SigninDTO } from './dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signup: SignUpDTO): Promise<{ token: string }> {
    const { email, name } = signup;
    const existsUser = await this._authRepository.findOne({
      where: { email: email },
    });

    if (existsUser) {
      throw new ConflictException('Email already exists');
    }

    const user: User = await this._authRepository.signup(signup);
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this._jwtService.sign(payload);
    return { token };
  }

  async signin(signin: SigninDTO): Promise<{ token: string }> {
    const { email, password } = signin;
    const user: User = await this._authRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    // este metodo de la libreria bycript compara la contraseña sin hash con la hasheada
    // y comprueba que sean iguales
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    //encripta y guarda el token (en el payload)
    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
