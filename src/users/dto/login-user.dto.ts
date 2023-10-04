import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: 'Почта', description: 'Электроный почта пользователя'})
    @IsEmail()
    mail: string;

    @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;
}