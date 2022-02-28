import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {

    @ApiProperty({example: 'User', description: 'Username'})
    @Prop()
    name: string

    @ApiProperty({example: 'password123', description: 'User password'})
    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);