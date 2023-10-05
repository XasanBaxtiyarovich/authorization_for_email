import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserGuard } from '../guards/user.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'регистрация пользователя'})
  @ApiResponse({status: 201, type: User})
  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registration(createUserDto);
  }

  @ApiOperation({summary: 'логин пользователя'})
  @ApiResponse({status: 201, type: User})
  @Post('signin')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto)
  }

  @ApiOperation({ summary: 'активировать пользователя'})
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @ApiOperation({summary: 'посмотреть всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(UserGuard)
  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'посмотреть одну пользователя'})
  @ApiResponse({status: 200, type: User})
  @UseGuards(UserGuard)
  @Get('find/:id')
  findOne(@Param('id') id: number) {
    return this.usersService.findByID(id);
  }

  @ApiOperation({summary: 'изменить одного пользователя'})
  @ApiResponse({status: 200, type: User})
  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({summary: 'изменить паролья'})
  @ApiResponse({status: 200, type: User})
  @Patch('update-password/:id')
  updatePass(@Param('id') id: number, @Body() updatePassDto: UpdatePassDto) {
    return this.usersService.updatePass(id, updatePassDto)
  }

  @ApiOperation({summary: 'удаление одну пользователя'})
  @ApiResponse({status: 200, type: User})
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}