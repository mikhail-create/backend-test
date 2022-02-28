import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
