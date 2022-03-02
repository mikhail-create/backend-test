import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty({example: 'test@mail.test', description: 'User email'})
    readonly email: string;

    @ApiProperty({example: 'password123', description: 'Password'})
    readonly password: string;
}