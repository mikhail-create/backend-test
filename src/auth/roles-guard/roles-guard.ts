import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserTokenData } from "src/auth/dto/auth-response.dto";
import { TokenService } from "../token.service";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private tokenService: TokenService,
        private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                console.log("User unauthorized");

                throw new UnauthorizedException({ message: 'User unauthorized' })
            }
            const userData: UserTokenData = await this.tokenService.validateAccessToken(token)
            if (!requiredRoles && userData) {
                return true
            }
            return userData.roles.some(role => requiredRoles.includes(role))
        }
        catch (error) {
            throw new UnauthorizedException({ message: 'User unauthorized' })
        }
    }
}