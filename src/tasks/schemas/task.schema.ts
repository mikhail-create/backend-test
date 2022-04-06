import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop()
    description: string

    @Prop()
    file: string

    @Prop({ required: true })
    date: Date

    @Prop({ required: true })
    author: string
}