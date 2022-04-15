import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        dto._id = new mongoose.Types.ObjectId()
        const newUser = new this.userModel(dto)
        return newUser.save()
    }

    async getAllUsers() {
        const allUsers = await this.userModel.find()
        return allUsers
    }

    async getUserById(id: string) {
        const user = await this.userModel.findOne({ _id: new mongoose.Types.ObjectId(id), include: { all: true } }).exec()
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email, include: { all: true } }).exec()
        return user;
    }

    async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel.findOneAndUpdate({ email }, updateUserDto, { new: false });
        return updatedUser
    }
}
