import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpCode, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-all.dto';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { LoginDto } from './dto/login.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'create User' })
  @ApiResponse({ status: 201, type: User })
  @Post('sign_up')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.create(createUserDto, res)
  }
  @ApiOperation({ summary: 'find All Users', })
  @ApiResponse({ status: 201, type: [User] })
  @UseGuards(AdminGuard)
  @Get('all')
  findAll(@Query() findAllDto: FindUserDto) {
    return this.userService.findAll(findAllDto);
  }

  @ApiOperation({ summary: 'find one user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'logout' })
  @ApiResponse({ status: 201, type: Object })
  @HttpCode(200)
  @Post('/auth/logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter() refresh_token: string,
  ) {
    return this.userService.logout(res, refresh_token);
  }

  @ApiOperation({summary: 'login'})
  @ApiResponse({status: 201, type: Object})
  @Post('/auth/signin')
  onLogin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.Login(loginDto, res);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
