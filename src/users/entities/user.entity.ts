import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Почта', description: 'Электроный почта пользователя'})
  @Column({type: 'text'})
  mail: string;

  @ApiProperty({ example: 'Имя', description: 'Имя пользователя'})
  @Column({type: 'text'})
  firstName: string;

  @ApiProperty({ example: 'Фамилия', description: 'Фамилия пользователя'})
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Отчество', description: 'Отчество пользователя'})
  @Column({type: 'text'})
  father_name: string;

  @ApiProperty({ example: 'Возраст', description: 'Возраст пользователя'})
  @Column({type: 'smallint'})
  age: number;

  @ApiProperty({ example: 'Пароль', description: 'Пароль пользователя'})
  @Column({type: 'text'})
  hashed_password: string;

  @ApiProperty({ example: 'Cсылка', description: 'Cсылка для активации'})
  @Column({type: 'text'})
  activation_link: string

  @ApiProperty({ example: 'true', description: 'Aktive'})
  @Column({ default: false })
  isActive: boolean;
}