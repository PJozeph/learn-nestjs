import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task-model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() getTaskFilterDto: GetTaskFilterDto): Task[] {
    return Object.keys(getTaskFilterDto).length
      ? this.tasksService.getTasksWithFilters(getTaskFilterDto)
      : this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param() params: any): Task {
    return this.tasksService.getTaskById(params.id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() createTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTask(id, createTaskDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log('title', createTaskDto.title);
    console.log('description', createTaskDto.description);
    return this.tasksService.createTask(createTaskDto);
  }
}
