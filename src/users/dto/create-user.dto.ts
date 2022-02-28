import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'User', description: 'Username'})
    readonly name: string;

    @ApiProperty({example: 'password123', description: 'Password'})
    readonly password: string;
}