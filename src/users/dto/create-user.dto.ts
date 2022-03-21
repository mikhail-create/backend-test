import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'test@mail.test', description: 'User email'})
    readonly email: string;

    @ApiProperty({example: 'User', description: 'Username'})
    readonly name: string;
    
    @ApiProperty({example: 'GROUP-101', description: 'Student group'})
    readonly group: string

    @ApiProperty({example: 'password123', description: 'Password'})
    readonly password: string;

    @ApiProperty({example: true, description: 'Mark for admin permissions'})
    readonly isAdmin: boolean;
}