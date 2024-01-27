import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
