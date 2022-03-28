import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users.schema';
import { UploadFileDto } from './dto/upload-files.dto';

@Injectable()
export class FilesService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async uploadFileByUser(email: string, uploadFileDto: UploadFileDto, filePath: string) {
        uploadFileDto.path = filePath
        const user = await this.userModel.findOneAndUpdate({ email }, { $push: { files: (uploadFileDto) } });
        return user
    }

    async getFilesByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email, include: { files: true } })
        return user.files;
    }
}
