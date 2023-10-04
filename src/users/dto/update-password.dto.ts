import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, MinLength } from "class-validator";

export class UpdatePassDto{
    @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsStrongPassword()
    oldPassword: string;

    @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsStrongPassword()
    newPassword: string;

    @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsStrongPassword()
    confirmPassword: string;
}