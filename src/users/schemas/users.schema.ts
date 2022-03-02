import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Document } from 'mongoose'
import { RolesEnum } from "./roles.enum";

export type UserDocument = User & Document

@Schema()
export class User {

    @ApiProperty({example: 'test@mail.test', description: 'User email'})
    @Prop({required: true})
    email: string

    @ApiProperty({example: 'User', description: 'Username'})
    @Prop({required: true})
    name: string

    @ApiProperty({example: 'password123', description: 'User password'})
    @Prop({required: true})
    password: string

    @ApiProperty({example: true, description: 'Mark for admin permissions'})
    @Prop({type: [{type: mongoose.Schema.Types.String}], default: RolesEnum.User})
    roles: RolesEnum[]
}

export const UserSchema = SchemaFactory.createForClass(User);