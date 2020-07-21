import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDTO } from './tdo/read-user.dto';
import { CreateUserDTO } from './tdo/create-user.dto';
import { UpdateUserDTO } from './tdo/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':userId')
  getUser(@Param('userId') userId: number): Promise<ReadUserDTO> {
    return this._userService.getUser(userId);
  }

  @Get()
  getAll(): Promise<ReadUserDTO[]> {
    return this._userService.getUsers();
  }

  @Post()
  create(@Body() user: CreateUserDTO): Promise<ReadUserDTO> {
    const userCreated = this._userService.create(user);
    return userCreated;
  }

  @Patch(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDTO,
  ): Promise<ReadUserDTO> {
    const userUpdated = this._userService.update(userId, user);
    return userUpdated;
  }

  @Delete(':userId')
  delete(@Param('userId') userId: number) {
    this._userService.delete(userId);
    return true;
  }
}
