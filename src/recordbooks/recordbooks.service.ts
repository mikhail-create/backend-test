import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordbookDto } from './dto/create-recordbook.dto';
import { RecordBook, RecordbookDocument } from './schemas/recordbooks.schema';

@Injectable()
export class RecordBookService {
    constructor(@InjectModel(RecordBook.name) private recordBookModel: Model<RecordbookDocument>) {
    }
    async getUserByEmail(email: string) {
        const user = await this.recordBookModel.findOne({ email: email, include: { all: true } }).exec()
        return user;
    }

    async createRecordBook(dto: CreateRecordbookDto): Promise<RecordBook> {
        const newRecordBook = new this.recordBookModel(dto)
        return newRecordBook.save()
    }
}
