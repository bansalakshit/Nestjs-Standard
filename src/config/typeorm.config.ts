import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'demo',
    password: 'demo',
    database: 'demo',
    entities: [__dirname + '/../**/**.entity{.ts,.js}'],
    synchronize: true,
};
