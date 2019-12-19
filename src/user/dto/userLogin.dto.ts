import { IsOptional, IsEmail } from 'class-validator';
import { IsUsername, IsPassword } from './user.dto';

export class LoginUser {
    @IsOptional()
    @IsUsername()
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsPassword()
    password: string;
}
