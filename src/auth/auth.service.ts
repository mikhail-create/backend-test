import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('User exist', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = { 
            email: user.email,
            name: user.name,
            roles: user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);

        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user
            }
        }

        throw new UnauthorizedException({ message: "Wrong name or password" })
    }
}
