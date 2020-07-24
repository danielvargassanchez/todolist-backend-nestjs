import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { ExecutionContext } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
