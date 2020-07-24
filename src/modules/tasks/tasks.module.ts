import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UserRepository } from '../user/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository, UserRepository]),
    AuthModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
