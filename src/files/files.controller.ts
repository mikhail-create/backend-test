import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Res, Param, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadFileDto } from './dto/upload-files.dto';
import { FilesService } from './files.service';
import { editFileName, imageFileFilter } from './utils/file-upload';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {
    }
    @Post(':email')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(
        @Param('email') email: string,
        @UploadedFile() file: any, @Body() uploadFileDto: UploadFileDto) {
        const filePath = "http://localhost:5000/uploads/" + file.filename
        return this.filesService.uploadFileByUser(email, uploadFileDto, filePath)
    }

    @Get('download/:email')
    getImage(@Param('email') email: string) {
        const user = this.filesService.getFilesByEmail(email)
        return user
        // const file = res.sendFile(, { root: './uploads' });
    }
}