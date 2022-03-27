import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { FilesController } from './files.controller';
@Module({
    controllers: [FilesController]
})
export class FilesModule { }