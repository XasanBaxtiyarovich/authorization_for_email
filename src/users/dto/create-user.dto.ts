import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Почта', description: 'Электроный почта пользователя'})
    @IsEmail()
    mail: string;

    @ApiProperty({ example: 'Имя', description: 'Имя пользователя'})
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Фамилия', description: 'Фамилия пользователя'})
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'Отчество', description: 'Отчество пользователя'})
    @IsNotEmpty()
    @IsString()
    father_name: string;

    @ApiProperty({ example: 'Возраст', description: 'Возраст пользователя'})
    @IsNumber()
    age: number;

    @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;
}