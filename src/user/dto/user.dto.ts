import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { decoratorBundle } from 'src/utils';

export const IsUsername = decoratorBundle([Length(2, 15), Matches(/^[a-z0-9-_]+$/)]);
export const IsPassword = decoratorBundle([Length(4, 128), Matches(/^[\w\-_@.`~!#$%^&*()+=?<>,[\]]+$/)]);

export class CreateUser {
    @IsUsername()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
