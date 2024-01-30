import { IsOptional } from '@nestjs/class-validator';
import { TaskStatus } from '../task-model';
import { IsEnum } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  search: string;
}
