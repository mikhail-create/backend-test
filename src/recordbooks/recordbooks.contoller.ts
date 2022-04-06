import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecordbookDto } from './dto/create-recordbook.dto';
import { RecordBookService } from './recordbooks.service';

@Controller()
export class RecordBookController {
  constructor(private readonly recordbookService: RecordBookService) {}

  @Get('/recordbooks/:email')
  findOne(@Param('email') email: string) {
    return this.recordbookService.getUserByEmail(email);
  }

  @Post('/recordbooks')
  createRecordbook(@Body() dto: CreateRecordbookDto) {
      return this.recordbookService.createRecordBook(dto)
  }
}
