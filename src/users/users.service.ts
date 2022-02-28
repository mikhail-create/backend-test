import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(dto)
        return newUser.save()
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async getUserByName(name: string) {
        const user = await this.userModel.findOne({name: name, include: {all: true}}).exec()
        return user;
    }
}
