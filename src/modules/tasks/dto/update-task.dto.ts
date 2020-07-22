import { Exclude } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

@Exclude()
export class UpdateTaskDTO {
  @IsString()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @MaxLength(500)
  readonly description: string;
}
