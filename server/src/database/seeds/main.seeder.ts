import { Establishment } from '@/entities/establishment.entity';
import { Picture } from '@/entities/picture.entity';
import { Review } from '@/entities/review.entity';
import { User } from '@/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User);
        await userFactory.save({ username: 'user', password: '1' });
        await userFactory.save({ username: 'admin', password: '1', role: 'admin' });
        await userFactory.saveMany(3);

        const establishmentFactory = factoryManager.get(Establishment);
        const reviewFactory = factoryManager.get(Review);
        const pictureFactory = factoryManager.get(Picture);

        const reviewRepository = dataSource.getRepository(Review);
        const pictureRepository = dataSource.getRepository(Picture);

        const establishments = await establishmentFactory.saveMany(5);

        await Promise.all(
            establishments.map(async (establishment) => {
                const reviews = await reviewFactory.saveMany(3, { establishment: establishment });
                await reviewRepository.save(reviews);
                const pictures = await pictureFactory.saveMany(5, { establishment: establishment });
                await pictureRepository.save(pictures);
                return;
            }),
        );
    }
}
