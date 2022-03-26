import { ApiProperty } from "@nestjs/swagger";
import { RolesEnum } from "../schemas/roles.enum";

export class UpdateUserDto {
    @ApiProperty({ example: 'test@mail.test', description: 'User email' })
    email: string

    @ApiProperty({ example: 'User', description: 'Username' })
    name: string

    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string

    @ApiProperty({ example: 'GROUP-101', description: 'Student group' })
    group: string

    @ApiProperty({ example: true, description: 'Mark for admin permissions' })
    roles: RolesEnum[]

    fullData: {
        passportSeries: string,
        passportNumber: string,
        adress: string,
        previousEducation: string,
        previousEducationPlace: string,
        previousEducationYear: string,
        phone: string
    }
}