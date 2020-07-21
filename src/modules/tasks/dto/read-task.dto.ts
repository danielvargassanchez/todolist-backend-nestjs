import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadTaskDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(100)
  readonly title: string;

  @Expose()
  @IsString()
  @MaxLength(500)
  readonly description: string;

  @Expose()
  @IsString()
  @MaxLength(20)
  readonly finished: string;
}
