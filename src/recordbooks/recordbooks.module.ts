import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RecordBookController } from './recordbooks.contoller';
import { RecordBookService } from './recordbooks.service';
import { RecordBook, RecordBookSchema } from './schemas/recordboos.schema';

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
