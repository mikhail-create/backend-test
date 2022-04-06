import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { Task } from "./task.schema";

export type TaskListDocument = TaskList & Document

@Schema()
export class TaskList {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    groups: string[]

    @Prop()
    tasks: Task[]
}

export const TaskSchema = SchemaFactory.createForClass(TaskList)