import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

@Exclude()
export class UpdateUserDTO {
  @Expose()
  @IsString()
  readonly name: string;
}
