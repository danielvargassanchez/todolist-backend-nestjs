import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpDTO, SigninDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('/signup')
  //validationpipe hace que se cumplan los pipes del dto (IsString...)
  @UsePipes(ValidationPipe)
  async signup(@Body() signUpDTO: SignUpDTO): Promise<{ token: string }> {
    return this._authService.signup(signUpDTO);
  }

  @Post('/signin')
  //validationpipe hace que se cumplan los pipes del dto (IsString...)
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDTO: SigninDTO): Promise<{ token: string }> {
    return this._authService.signin(signinDTO);
  }
}
