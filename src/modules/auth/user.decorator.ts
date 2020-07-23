import { createParamDecorator } from '@nestjs/common';
import { UserDTO } from '../user/tdo/user.tdo';

export const GetUser = createParamDecorator(
  (data, req): UserDTO => {
    return req.user;
  },
);
