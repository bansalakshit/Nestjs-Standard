import { User } from './user.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Register } from './types/user';
import { getSingleBy } from 'src/utils';

export const getUserBy = getSingleBy<Register>(User);

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async insertUser(user: Register) {
        return await getRepository(User).insert(user);
    }
}
