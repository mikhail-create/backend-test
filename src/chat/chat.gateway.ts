import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { MessageTypes } from "./types/message.type";

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('room')
    handleConnection(client: Socket, room: string): any {
        console.log('New client connected', client.id);
        console.log('Room: ', room);
        client.join(room);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: MessageTypes): void {
        console.log(data);
        const name = data.name;
        const message = data.message
        
        this.server.in(data.room_id).emit('message', {name, message});
    }
}
