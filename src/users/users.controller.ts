import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles-guard/roles-guard';
import { Roles } from 'src/auth/roles-guard/roles-auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesEnum } from './schemas/roles.enum';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles(RolesEnum.Admin)
    @UseGuards(RolesGuard)
    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.getUserById(id)
    }

    @ApiOperation({summary: 'Creating new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

}
