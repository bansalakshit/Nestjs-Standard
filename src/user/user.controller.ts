import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/user.dto';
import { LoginUser } from './dto/userLogin.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    userRegister(@Body(ValidationPipe) userDto: CreateUser) {
        return this.userService.userRegister(userDto);
    }

    @Post('login')
    userlogin(@Body(ValidationPipe) userLogin: LoginUser) {
        return this.userService.userLogin(userLogin);
    }
}
