import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Controller()
export class ChatController {
    constructor(private readonly chatGateway: ChatGateway) { }

    @Get('/chat')
    getChat() {
        return "Hello World!";
    }
}
