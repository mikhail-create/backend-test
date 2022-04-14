import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatUpdateDto } from './dto/chat-update.dto';

@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('chat/getRoom/:sender_id/:user_id')
    getRoom(@Param('sender_id') sender_id: string, @Param('user_id') user_id: string) {
        return this.chatService.getRoom(sender_id, user_id)
    }

    @Get('/chat/get/:email')
    getChat(@Param('email') email: string) {
        return this.chatService.getChatsById(email)
    }

}
