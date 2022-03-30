import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordbookDto } from './dto/create-recordbook.dto';
import { RecordBook, RecordbookDocument } from './schemas/recordboos.schema';

@Injectable()
export class RecordBookService {
    constructor(@InjectModel(RecordBook.name) private userModel: Model<RecordbookDocument>) {
    }
    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email, include: { all: true } }).exec()
        return user;
    }

    async createUser(dto: CreateRecordbookDto): Promise<RecordBook> {
        const newUser = new this.userModel(dto)
        return newUser.save()
    }
}
