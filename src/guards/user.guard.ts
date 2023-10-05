import { JwtService } from "@nestjs/jwt";
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { User } from "../users/entities/user.entity";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('пользователь не авторизован');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('токен неправильный');

        try {
            const user: Partial<User> = await this.jwtService.verify(token, {secret: process.env.TOKEN_KEY});
            
            if(!user) throw new UnauthorizedException('пользователь не найден');

            return true;
        } catch (error) {
            throw new UnauthorizedException('пользователь не найден');
        }
    } 
}