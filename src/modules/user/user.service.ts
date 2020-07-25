import {
  Injectable,
  Get,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ExecutionContext,
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
import { Request } from 'express';
import { IJwtPayload } from '../auth/jwt-payload.interface';
import { ReadTaskDTO } from '../tasks/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getUser(req: Request): Promise<ReadUserDTO> {
    const user: Partial<IJwtPayload> = req.user;

    if (!user.id) {
      throw new BadRequestException('Jwt must be sent');
    }

    const userExists: User = await this._userRepository.findOne(user.id, {
      where: { status: status.ACTIVE },
    });

    if (!userExists) {
      throw new NotFoundException();
    }

    const userDto: ReadUserDTO = plainToClass(ReadUserDTO, userExists);
    userDto.tasks = userExists.tasks.map(task =>
      plainToClass(ReadTaskDTO, task),
    );

    return plainToClass(ReadUserDTO, userDto);
  }

  async getUsers(): Promise<ReadUserDTO[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });
    return users.map(user => plainToClass(ReadUserDTO, user));
  }

  async update(
    req: Request,
    user: Partial<UpdateUserDTO>,
  ): Promise<ReadUserDTO> {
    const userData: Partial<IJwtPayload> = req.user;

    if (!userData.id || !user) {
      throw new BadRequestException('jwt & user must be sent');
    }

    const userExists = await this._userRepository.findOne(userData.id);
    if (!userExists) {
      throw new NotFoundException('This user does not exists');
    }

    userExists.name = user.name;
    const userUpdated = await this._userRepository.save(userExists);

    return plainToClass(ReadUserDTO, userUpdated);
  }

  async delete(req: Request): Promise<void> {
    const user: Partial<IJwtPayload> = req.user;
    if (!user.id) {
      throw new BadRequestException('jwt must be sent');
    }

    const userExists = await this._userRepository.findOne(user.id, {
      where: { status: status.ACTIVE },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${user.id} does not exists`);
    }

    this._userRepository.update(user.id, { status: status.INACTIVE });
  }
}
