export class ChatUpdateDto {
    room_id: string
    users: {
        user_id: string
        name: string
    }[]
    messages: {
        author: string
        message: string
    }[]
}