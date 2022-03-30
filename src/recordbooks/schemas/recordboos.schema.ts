import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type RecordbookDocument = RecordBook & Document

@Schema()
export class RecordBook {

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    number: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    format: string

    @Prop({ required: true })
    speciality: string

    @Prop({ required: true })
    requisites: string

    @Prop({ required: true })
    librarycard: string

    @Prop({ required: true })
    semesters: {
        exams: {
            nameOfCourse: string,
            hours: number,
            rating: number,
            rate: string,
            date: string,
            teacher: string
        }[],

        offset: {
            nameOfCourse: string,
            hours: number,
            rating: number,
            rate: string,
            date: string,
            teacher: string
        }[]
    }[]

}

export const RecordBookSchema = SchemaFactory.createForClass(RecordBook);