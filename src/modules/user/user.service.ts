import {
  Injectable,
  Get,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { status } from '../../shared/entity-status.enum';
import { Tasks } from '../tasks/tasks.entity';
import { ReadUserDTO } from './tdo/read-user.dto';
import { plainToClass } from 'class-transformer';
import { CreateUserDTO } from './tdo/create-user.dto';
import { UpdateUserDTO } from './tdo/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getUser(userId: number): Promise<ReadUserDTO> {
    if (!userId) {
      throw new BadRequestException('Id must be sent');
    }

    const user: User = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDTO, user);
  }

  async getUsers(): Promise<ReadUserDTO[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });
    return users.map(user => plainToClass(ReadUserDTO, user));
  }

  async create(user: Partial<CreateUserDTO>): Promise<ReadUserDTO> {
    if (!user.name || !user.email || !user.password) {
      throw new BadRequestException('User must be sent');
    }

    const userExists: User = await this._userRepository.findOne({
      where: { email: user.email, status: status.ACTIVE },
    });

    if (userExists) {
      throw new ConflictException('This email has been used ');
    }

    const task = new Tasks();
    task.title = 'Sin tareas';
    task.description = 'task description';
    const userSaved: User = await this._userRepository.save({
      name: user.name,
      email: user.email,
      password: user.password,
      status: status.ACTIVE,
      task,
    });
    return plainToClass(ReadUserDTO, userSaved);
  }

  async update(
    userId: number,
    user: Partial<UpdateUserDTO>,
  ): Promise<ReadUserDTO> {
    if (!userId || !user) {
      throw new BadRequestException('userId & user must be sent');
    }

    const userExists = await this._userRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundException('This user does not exists');
    }

    userExists.name = user.name;
    const userUpdated = await this._userRepository.save(userExists);

    return plainToClass(ReadUserDTO, userUpdated);
  }

  async delete(userId: number): Promise<void> {
    if (!userId) {
      throw new BadRequestException('userId must be sent');
    }

    const userExists = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} does not exists`);
    }

    this._userRepository.update(userId, { status: status.INACTIVE });
  }
}
