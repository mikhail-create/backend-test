import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { AuthCheckDto, AuthResponseDto, UserTokenData} from 'src/auth/dto/auth-response.dto';
import { TokenService } from './token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, 
                private tokenService: TokenService) {}

    async signIn(userDto: AuthUserDto): Promise<AuthResponseDto> {
        const {_id, name, email, roles, group} = await this.validateUser(userDto)
        const user: UserTokenData = {_id, name, email, roles, group}
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }

    async signUp(userDto: CreateUserDto): Promise<AuthResponseDto> {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, parseInt(process.env.SALT))
        const {_id, name, email, roles, group} = await this.userService.createUser({ ...userDto, password: hashPassword })
        const user: UserTokenData = {_id, name, email, roles, group}
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }
    
    async refresh(refresh: string): Promise<AuthResponseDto> {        
        const userData: UserTokenData  = await this.tokenService.validateRefreshToken(refresh)
        const {_id, name, email, roles, group} = await this.userService.getUserByEmail(userData.email)
        if (!name) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }
        const user: UserTokenData = {_id, name, email, roles, group}
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }

    async checkIsSignedIn(access: string): Promise<AuthCheckDto> {
        const userData: UserTokenData  = await this.tokenService.validateAccessToken(access)
        const {_id, name, email, roles, group} = await this.userService.getUserByEmail(userData.email)
        if (!name) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
        }
        const user: UserTokenData = {_id, name, email, roles, group}
        return { 
            userData: user
        }
    }

    private async validateUser(userDto: AuthUserDto): Promise<User> {
        const user: User  = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new BadRequestException({ message: 'User not found' })
        }
        const passwordsEqual = await bcrypt.compare(userDto.password, user.password)
        if (!passwordsEqual) {
            throw new BadRequestException({ message: 'Wrong password' })
        }
        return user
    }
}