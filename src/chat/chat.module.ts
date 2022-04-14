import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    imports: [forwardRef(() => UsersModule),
    MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
    ]),],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService],
})
export class ChatModule { }
