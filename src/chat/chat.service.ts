import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { v4 } from 'uuid';
import { ChatUpdateDto } from './dto/chat-update.dto';

@Injectable()
export class ChatService {
    constructor(private readonly userService: UsersService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getChatsById(email: string) {
        const user = await this.userService.getUserByEmail(email);
        return user.dialoges;
    }

    async updateChat(chat: ChatUpdateDto) {

    }

    async getRoom(sender_id: string, user_id: string) {
        const user = await this.userService.getUserById(sender_id);
        const second_user = await this.userService.getUserById(user_id);

        const room = user.dialoges.find(dialog => dialog.users[0].user_id === user_id || dialog.users[1].user_id === user_id);
        if (room) {
            return room;
        } else {
            const newRoom = {
                room_id: v4(),
                users: [{ user_id: user_id, name: second_user.name }, { user_id: sender_id, name: user.name }],
                messages: []
            }
            const updatedUsers = await this.userModel.updateMany({
                _id: {
                    $in: [
                        new mongoose.Types.ObjectId(sender_id),
                        new mongoose.Types.ObjectId(user_id)
                    ]
                }
            }, {
                $push: { dialoges: newRoom }
            });
            return updatedUsers;
        }
    }
}
