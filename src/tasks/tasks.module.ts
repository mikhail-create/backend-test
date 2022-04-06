import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskList, TaskSchema } from './schemas/tasks-list.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([
        { name: TaskList.name, schema: TaskSchema, collection: 'tasks' },
    ])
],
})
export class TasksModule {}
