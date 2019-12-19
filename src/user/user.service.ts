import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUser } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository, getUserBy } from './user.repository';
import { LoginUser } from './dto/userLogin.dto';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
import { Register } from './types/user';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async userRegister(request: CreateUser): Promise<Register> {
        try {
            const id = uuid();
            const condition = !!request.email ? {email: request.email} : {username: request.username};
            const result = await getUserBy(condition);
            if (result) { throw new BadRequestException('User already exist..'); }
            const pass = await bcrypt.hash(request.password, 10);
            const userObj: Register = {
                id,
                username: request.username,
                email: request.email,
                password: pass,
            };
            await this.userRepository.insertUser(userObj);
            return userObj;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async userLogin(request: LoginUser): Promise<string> {
        const condition = !!request.email ? {email: request.email} : {username: request.username};
        if (!condition || !request.password) {
            throw new BadRequestException('Incomplete Arguements..');
        } else {
            const user = await getUserBy(condition);
            if (user) {
                const verify = await bcrypt.compare(request.password, user.password);
                if (verify === true) {
                    return 'Login Successfully..';
                } else if (verify === false) {
                    throw new BadRequestException('Password does not match..');
                }
            } else {
                return 'User does not exist..';
            }
        }
    }
}
