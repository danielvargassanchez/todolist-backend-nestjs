import { IsString, IsEmail, IsNumber } from 'class-validator';
import { Tasks } from 'src/modules/tasks/tasks.entity';

export class UserDTO {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly tasks: Tasks[];
}
