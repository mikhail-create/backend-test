import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { v4 } from 'uuid';
import { ChatUpdateDto } from './dto/chat-update.dto';
import { MessageTypes } from './types/message.type';

@Injectable()
export class ChatService {
    constructor(private readonly userService: UsersService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getDialogData(email: string, id: string) {
        const user = await this.userService.getUserByEmail(email);
        const dialog = user.dialoges.find(dialog => dialog.room_id === id);
        console.log(dialog);
        return dialog;
    }

    async getDialogsList(email: string) {
        const user = await this.userService.getUserByEmail(email);
        return user.dialoges;
    }

    async checkAccess(email: string, room_id: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user.dialoges.find(dialog => dialog.room_id === room_id)) {
            return true;
        } else {
            return
        }
    }

    async updateChat(data: MessageTypes) {
        const user = await this.userService.getUserByEmail(data.email);
        const room = user.dialoges.find(dialog => dialog.room_id === data.room_id);
        const users = room.users.map(user => new mongoose.Types.ObjectId(user.user_id));
        console.log(data);
        const newMessage = {
            author: data.name,
            message: data.message,
        }

        const updatedUser = await this.userModel.updateMany(
            {
                _id: { $in: users },
                dialoges: {
                    $elemMatch: {
                        room_id: data.room_id
                    }
                }
            },
            {
                $push: {
                    'dialoges.$.messages': newMessage
                },
            },
            {
                new: true
            }
        );

        return updatedUser;
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
