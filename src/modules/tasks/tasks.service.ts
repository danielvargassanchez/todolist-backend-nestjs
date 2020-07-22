import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { ReadTaskDTO, CreateTaskDTO, UpdateTaskDTO } from './dto';
import { plainToClass } from 'class-transformer';
import { Tasks } from './tasks.entity';
import { UserRepository } from '../user/user.repository';
import { finished } from 'src/shared/tasks-finished.enum';
import { User } from '../user/user.entity';
import { status } from 'src/shared/entity-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly _tasksRepository: TasksRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(taskId: number): Promise<ReadTaskDTO> {
    if (!taskId) {
      throw new BadRequestException('id must be sent');
    }
    const taskExists: Tasks = await this._tasksRepository.findOne(taskId);

    if (!taskExists) {
      throw new NotFoundException(`task with id ${taskId} does not exists`);
    }

    return plainToClass(ReadTaskDTO, taskExists);
  }

  //para pruebas dejar este método, en desarrollo quitarlo.
  async getAll(): Promise<ReadTaskDTO[]> {
    const tasks: Tasks[] = await this._tasksRepository.find();
    return tasks.map(task => plainToClass(ReadTaskDTO, task));
  }

  async getMyTasks(userId: number): Promise<ReadTaskDTO[]> {
    if (!userId) {
      throw new BadRequestException('userId must be sent');
    }

    const userExists: User = await this._userRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} does not exists`);
    }

    const myTasks: Tasks[] = await this._tasksRepository.find({
      where: {
        user: userId,
        finished: finished.IN_PROCESS,
      },
    });

    return myTasks.map(task => plainToClass(ReadTaskDTO, task));
  }

  async create(
    userId: number,
    task: Partial<CreateTaskDTO>,
  ): Promise<ReadTaskDTO> {
    if (!userId || !task) {
      throw new BadRequestException('userId & task must be sent');
    }

    const userExists = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });
    if (!userExists) {
      throw new NotFoundException(`user with id ${userId} does not exists`);
    }

    const taskSaved: Tasks = await this._tasksRepository.save({
      title: task.title,
      description: task.description,
      finished: finished.IN_PROCESS,
      user: userExists,
    });

    return plainToClass(ReadTaskDTO, taskSaved);
  }

  async taskStatus(taskId: number, status: string): Promise<any> {
    if (!taskId) {
      throw new BadRequestException('Taskid must be sent');
    }
    const task: Tasks = await this._tasksRepository.findOne(taskId);
    task.finished = status;
    this._tasksRepository.save(task);
    return true;
  }

  async update(
    taskId: number,
    task: Partial<UpdateTaskDTO>,
  ): Promise<ReadTaskDTO> {
    if (!taskId || !task) {
      throw new BadRequestException('idTask & task must be sent');
    }
    const taskExist: Tasks = await this._tasksRepository.findOne(taskId);
    taskExist.title = task.title;
    taskExist.description = task.description;

    const taskUpdated = await this._tasksRepository.save(taskExist);

    return plainToClass(ReadTaskDTO, taskUpdated);
  }
}
