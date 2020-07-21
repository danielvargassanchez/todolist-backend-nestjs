import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/modules/user/user.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}
