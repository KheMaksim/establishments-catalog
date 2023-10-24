import EstablishmentFactory from '@/database/factories/establishment.factory';
import PictureFactory from '@/database/factories/picture.factory';
import ReviewFactory from '@/database/factories/review.factory';
import UserFactory from '@/database/factories/user.factory';
import MainSeeder from '@/database/seeds/main.seeder';
import { Establishment } from '@/entities/establishment.entity';
import { Picture } from '@/entities/picture.entity';
import { Review } from '@/entities/review.entity';
import { User } from '@/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'restaurants',
    username: 'root',
    password: 'root',
    synchronize: true,
    logging: false,
    entities: [User, Establishment, Review, Picture],
    factories: [UserFactory, EstablishmentFactory, ReviewFactory, PictureFactory],
    seeds: [MainSeeder],
};

export const appDataSource = new DataSource(options);
