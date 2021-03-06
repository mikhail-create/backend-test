import mongoose from "mongoose"
import { RolesEnum } from "../../users/schemas/roles.enum"

export type AuthResponseDto = {
    readonly userData: UserTokenData
    readonly access: string
    readonly refresh: string
}

export type UserTokenData = {
    readonly _id: mongoose.Types.ObjectId
    readonly name: string
    readonly email: string
    readonly group: string
    readonly roles: RolesEnum[]
}

export type AuthCheckDto = {
    readonly userData: UserTokenData
}