import {
  Controller,
  Injectable,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReadTaskDTO, CreateTaskDTO, UpdateTaskDTO } from './dto';
import { finished } from 'src/shared/tasks-finished.enum';

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

  @Delete(':taskId')
  cancelTask(@Param('taskId') taskId: number): Promise<any> {
    const result = this._taskService.taskStatus(taskId, finished.CANCELED);
    return result;
  }

  @Patch('cancel/:taskId')
  finishTask(@Param('taskId') taskId: number): Promise<any> {
    const result = this._taskService.taskStatus(taskId, finished.FINISHED);
    return result;
  }

  @Patch('update/:taskId')
  update(
    @Param('taskId') taskId: number,
    @Body() task: UpdateTaskDTO,
  ): Promise<ReadTaskDTO> {
    const taskUpdated = this._taskService.update(taskId, task);
    return taskUpdated;
  }
}
