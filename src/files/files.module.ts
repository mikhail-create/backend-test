import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, '../..', 'uploads'),
            serveRoot: '/uploads'
        }),
    ],
    providers: [FilesService],
    controllers: [FilesController]
})
export class FilesModule { }