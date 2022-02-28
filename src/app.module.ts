import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env'
    }),
    UsersModule,
    MongooseModule.forRoot(`mongodb+srv://Mikhail:123321@cluster0.zjezr.mongodb.net/users?retryWrites=true&w=majority`),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
