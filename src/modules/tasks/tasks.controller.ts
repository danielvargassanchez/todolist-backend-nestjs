import {
  Controller,
  Injectable,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Request,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReadTaskDTO, CreateTaskDTO, UpdateTaskDTO } from './dto';
import { finished } from 'src/shared/tasks-finished.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Get('/myTasks')
  @UseGuards(AuthGuard())
  getMyTasks(@Request() req): Promise<ReadTaskDTO[]> {
    const myTasks = this._taskService.getMyTasks(req);
    return myTasks;
  }

  @Get(':taskId')
  get(@Param('taskId', ParseIntPipe) taskId: number): Promise<ReadTaskDTO> {
    const task = this._taskService.get(taskId);
    return task;
  }

  // @Get()
  // getAll(): Promise<ReadTaskDTO[]> {
  //   const tasks = this._taskService.getAll();
  //   return tasks;
  // }

  @Post()
  @UseGuards(AuthGuard())
  create(@Request() req, @Body() task: CreateTaskDTO): Promise<ReadTaskDTO> {
    const createdUser = this._taskService.create(req, task);
    return createdUser;
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard())
  cancelTask(@Param('taskId') taskId: number): Promise<any> {
    console.log('entrando');
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
