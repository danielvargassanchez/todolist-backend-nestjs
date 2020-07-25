import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEmail, IsNumber } from 'class-validator';
import { Tasks } from 'src/modules/tasks/tasks.entity';
import { ReadTaskDTO } from 'src/modules/tasks/dto';

@Exclude()
export class ReadUserDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  tasks: ReadTaskDTO[];
}
