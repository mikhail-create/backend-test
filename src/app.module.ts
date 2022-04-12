import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { RecordBookModule } from './recordbooks/recordbooks.module';
import { TasksModule } from './tasks/tasks.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.URI),
    AuthModule,
    FilesModule,
    RecordBookModule,
    TasksModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}