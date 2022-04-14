import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Document } from 'mongoose'
import { RolesEnum } from "./roles.enum";

export type UserDocument = User & Document

class FullDataUser {
    passportSeries: string
    passportNumber: string
    adress: string
    previousEducation: string
    previousEducationPlace: string
    previousEducationYear: string
    phone: string
}

@Schema()
export class User {

    @Prop({ required: false })
    _id: mongoose.Types.ObjectId

    @ApiProperty({ example: 'test@mail.test', description: 'User email' })
    @Prop({ required: true })
    email: string

    @ApiProperty({ example: 'User', description: 'Username' })
    @Prop({ required: true })
    name: string

    @ApiProperty({ example: 'password123', description: 'User password' })
    @Prop({ required: true })
    password: string

    @ApiProperty({ example: 'GROUP-101', description: 'Student group' })
    @Prop({ required: true, default: "GROUP UNSET" })
    group: string

    @ApiProperty({ example: true, description: 'Mark for admin permissions' })
    @Prop({ type: [{ type: mongoose.Schema.Types.String }], default: RolesEnum.User })
    roles: RolesEnum[]

    @Prop({
        required: false, default: {
            passportSeries: "",
            passportNumber: "",
            adress: "",
            previousEducation: "",
            previousEducationPlace: "",
            previousEducationYear: "",
            phone: ""
        }
    })
    fullData: FullDataUser

    @Prop({ required: false })
    files: [
        {
            course: string
            name: string
            path: string
            semester: string
        }
    ]

    @Prop({ required: false, default: [] })
    dialoges: {
        room_id: string
        users: {
            user_id: string
            name: string
        }[]
        messages: {
            author: string
            message: string
        }[]
    }[]
}

export const UserSchema = SchemaFactory.createForClass(User);