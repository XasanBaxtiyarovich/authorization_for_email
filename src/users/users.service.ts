import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)private usersRepository: Repository<User>, 
    private jwtService: JwtService,
    private mailService: MailService
  ){}
  
  async getTokens(user: User) {
    const jwtPayload = { id: user.id, is_active: user.isActive }
  
    const [token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.Token_Key || "MyAccesVery",
        expiresIn: process.env.Token_Time || "15h"
      })
    ]);
    
    return { token };
  }

  async registration(createUserDto: CreateUserDto) {
    const [user] = await this.usersRepository.findBy({ mail: createUserDto.mail , isActive: true});
    if(user) throw new BadRequestException('на этот email уже зарегистрирован аккаунт');

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    
    const link: string = v4();
    
    const newUser = await this.usersRepository.save({...createUserDto, hashed_password: hashed_password, activation_link: link});
    
    const token = await this.getTokens(newUser);

    try {
      await this.mailService.sendUserConfirmation(newUser);
    } catch (error) {
      console.log(error)
    }

    const response = {message: 'пользователь зарегистрирован', user: newUser, token};
    
    return response;
  }

  async login(loginUserDto: LoginUserDto) {
    const [user] = await this.usersRepository.findBy({ mail: loginUserDto.mail });
    if(!user) throw new BadRequestException('такого пользователя не существует или пароль не правильное');

    const pass = await bcrypt.compare(loginUserDto.password, user.hashed_password);
    if(!pass) throw new BadRequestException('такого пользователя не существует или пароль не правильное');

    const token = await this.getTokens(user);

    const response = {message: 'пользователь зарегистрирован', user: user, token};

    return response;
  }

  async activate(link: string) {
    if(!link) throw new BadRequestException('ссылка для активации не доступен')

    await this.usersRepository.update({activation_link: link, isActive: false}, {isActive: true})

    const [User] = await this.usersRepository.findBy({ activation_link: link , isActive: true});
    
    if(!User) throw new BadRequestException('пользователь не активен')

    const response = {message: 'пользователь активирован', user: User}

    return response
  }  

  async findAll() {
    const users = await this.usersRepository.find();

    if (users.length == 0) throw new UnauthorizedException('пользователей ещё нет');

    return users;
  }

  async findByID(id: number) {
    const [user] = await this.usersRepository.findBy({ id });
    
    if (!user) return HttpStatus.NOT_FOUND;

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await this.usersRepository.findBy({ id });
    
    if (!user) return HttpStatus.NOT_FOUND;

    await this.usersRepository.update(
      {
        id: id
      }, 
      {
        age: updateUserDto.age,
        mail: updateUserDto.mail, 
        lastName: updateUserDto.lastName,
        firstName: updateUserDto.firstName,
        father_name: updateUserDto.father_name
      }
    );

    const updateUser = await this.usersRepository.findBy({ id });

    return {updateUser};
  }

  async updatePass(id: number, updatePassDto: UpdatePassDto){
    const [user] = await this.usersRepository.findBy({ id });
    if (!user) return HttpStatus.NOT_FOUND;

    const pass = await bcrypt.compare(updatePassDto.oldPassword, user.hashed_password);
    if (!pass) throw new UnauthorizedException('пароль не правильный');

    if (updatePassDto.newPassword != updatePassDto.confirmPassword) throw new UnauthorizedException('подтверждение паролья не правильный');

    const hashed_password = await bcrypt.hash(updatePassDto.newPassword, 7);

    await this.usersRepository.update({id}, {hashed_password});

    const [updatePassUser] = await this.usersRepository.findBy({ id });

    return {updatePassUser};
  }

  async remove(id: number) {
    const [user] = await this.usersRepository.findBy({ id });
    
    if (!user) return HttpStatus.NOT_FOUND;

    await this.usersRepository.delete({ id });

    return {DeleteUser: user };
  }
}