import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
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
}