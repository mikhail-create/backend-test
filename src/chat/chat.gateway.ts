import { HttpException, HttpStatus } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { UsersService } from "src/users/users.service";
import { ChatService } from "./chat.service";
import { MessageTypes } from "./types/message.type";

@WebSocketGateway({ cors: true })
export class ChatGateway {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer()
    server: Server

    @SubscribeMessage('room')
    handleConnection(client: Socket, data: { room: string, email: string }) {
        if (data) {
            this.chatService.checkAccess(data.email, data.room).then(res => {
                if (res) {
                    console.log('user is in room');
                    client.join(data.room);
                } else {
                    console.log('user is not in room');
                    return new WsException('You are not in this room');
                }
            })
        }
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: MessageTypes): void {
        if (data) {
            this.chatService.checkAccess(data.email, data.room_id).then(res => {
                if (res) {
                    const name = data.name;
                    const message = data.message
                    this.server.in(data.room_id).emit('message', { name, message });
                    this.chatService.updateChat(data)
                } else {
                    return new WsException('You are not in this room');
                }
            })
        }
    }
}
