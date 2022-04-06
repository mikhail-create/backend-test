import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordBookController } from './recordbooks.contoller';
import { RecordBookService } from './recordbooks.service';
import { RecordBook, RecordBookSchema } from './schemas/recordbooks.schema';

@Module({
    providers: [RecordBookService],
    controllers: [RecordBookController],
    imports: [
        MongooseModule.forFeature([
            { name: RecordBook.name, schema: RecordBookSchema, collection: 'recordbooks' },
        ])
    ],
})
export class RecordBookModule { }
