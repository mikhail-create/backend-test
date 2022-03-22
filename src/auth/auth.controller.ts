import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/users.schema';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: User })
    @ApiBody({ type: [AuthUserDto] })
    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.authService.signIn(userDto)
    }

    @Post('/refresh')
    refresh(@Body() tokensDto: RefreshDto) {
        console.log(tokensDto);
        const response = this.authService.refresh(tokensDto.refresh)
        return response
    }

    @ApiOperation({ summary: 'New user registration' })
    @ApiResponse({ status: 200, type: User })
    @ApiBody({ type: [CreateUserDto] })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto)
    }
}
