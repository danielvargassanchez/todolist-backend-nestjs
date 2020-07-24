import {
  Controller,
  Get,
  Body,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDTO } from './tdo/read-user.dto';
import { UpdateUserDTO } from './tdo/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get()
  getUser(@Request() req): Promise<ReadUserDTO> {
    return this._userService.getUser(req);
  }

  @Get('/allUsers')
  getAll(): Promise<ReadUserDTO[]> {
    return this._userService.getUsers();
  }

  @UseGuards(AuthGuard())
  @Patch()
  update(@Request() req, @Body() user: UpdateUserDTO): Promise<ReadUserDTO> {
    const userUpdated = this._userService.update(req, user);
    return userUpdated;
  }

  @UseGuards(AuthGuard())
  @Delete()
  delete(@Request() req) {
    this._userService.delete(req);
    return true;
  }
}
