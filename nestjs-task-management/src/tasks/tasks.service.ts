import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task-model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'First task',
      description: 'This is the first task',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Second task',
      description: 'This is the second task',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Third task',
      description: 'This is the third task',
      status: TaskStatus.DONE,
    },
  ];

  getTasksWithFilters(getTaskFilterDto: GetTaskFilterDto): Task[] {
    const { status, search } = getTaskFilterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  deleteTaskById(id: string): Task {
    const found = this.getTaskById(id);
    if (!found) {
      throw new NotFoundException('Task not found');
    } else {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      return found;
    }
  }

  updateTask(id: string, updateDto: UpdateTaskDto): Task {
    const { status } = updateDto;
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    } else {
      task.status = status;
      return task;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
