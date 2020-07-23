import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDTO } from './tdo/read-user.dto';
import { CreateUserDTO } from './tdo/create-user.dto';
import { UpdateUserDTO } from './tdo/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':userId')
  getUser(
    @Param('userId') userId: number,
    @Request() req,
  ): Promise<ReadUserDTO> {
    return this._userService.getUser(userId, req);
  }

  @Get()
  getAll(): Promise<ReadUserDTO[]> {
    return this._userService.getUsers();
  }

  @UseGuards(AuthGuard())
  @Patch(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDTO,
  ): Promise<ReadUserDTO> {
    const userUpdated = this._userService.update(userId, user);
    return userUpdated;
  }

  @UseGuards(AuthGuard())
  @Delete(':userId')
  delete(@Param('userId') userId: number) {
    this._userService.delete(userId);
    return true;
  }
}
