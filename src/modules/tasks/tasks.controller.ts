import {
  Controller,
  Injectable,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReadTaskDTO, CreateTaskDTO } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Get(':taskId')
  get(@Param('taskId', ParseIntPipe) taskId: number): Promise<ReadTaskDTO> {
    const task = this._taskService.get(taskId);
    return task;
  }

  @Get()
  getAll(): Promise<ReadTaskDTO[]> {
    const tasks = this._taskService.getAll();
    return tasks;
  }

  @Get('/myTasks/:userId')
  getMyTasks(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ReadTaskDTO[]> {
    const myTasks = this._taskService.getMyTasks(userId);
    return myTasks;
  }

  @Post(':userId')
  create(
    @Param('userId') userId: number,
    @Body() task: CreateTaskDTO,
  ): Promise<ReadTaskDTO> {
    const createdUser = this._taskService.create(userId, task);
    return createdUser;
  }
}
