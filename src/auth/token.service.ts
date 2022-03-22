import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserTokenData } from "src/auth/dto/auth-response.dto";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}
    async generateAccessToken(payload: UserTokenData): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_KEY,
            expiresIn: '15m'
        })
    }

    async generateRefreshToken(payload: UserTokenData): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: process.env.REFRESH_KEY,
            expiresIn: '30d'
          })
    }

    async validateAccessToken(access: string): Promise<UserTokenData> {
        try {
            return this.jwtService.verify(access, { secret: process.env.ACCESS_KEY })
        }
        catch (error) {
            throw new UnauthorizedException({message: "Access token expired"})
        }
    }

    async validateRefreshToken(refresh: string): Promise<UserTokenData> {
        try {
            return this.jwtService.verify(refresh, { secret: process.env.REFRESH_KEY })
        }
        catch (error) {
            throw new UnauthorizedException({message: "Refresh token expired"})
        }
    }

    syncValidateAccessToken(access: string): UserTokenData {
        try {
            return this.jwtService.verify(access, { secret: process.env.ACCESS_KEY })
        }
        catch {
            throw new UnauthorizedException({message: "Sync Access token expired"})
        }
    }
}