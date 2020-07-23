import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, TasksModule, DatabaseModule, ConfigModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
