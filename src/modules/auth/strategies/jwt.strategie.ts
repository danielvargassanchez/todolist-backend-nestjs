import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { status } from 'src/shared/entity-status.enum';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      //especificar de donde se va a sacar ese token
      // los jwt vienen en el header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //la secret del jwt
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  //metodo para comprobar que el usuario existe (el que mando el jwt)
  //recibe la interfaz del payload para obtener sus propiedades
  async validate(payload: IJwtPayload) {
    const { email } = payload;
    const user = await this._authRepository.findOne({
      where: { email, status: status.ACTIVE },
    });

    if (!user) {
      throw new UnauthorizedException('');
    }

    return payload;
  }
}
