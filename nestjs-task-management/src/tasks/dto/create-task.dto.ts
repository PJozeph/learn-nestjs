import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
