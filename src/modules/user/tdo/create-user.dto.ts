import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class CreateUserDTO {
  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly password: string;
}
