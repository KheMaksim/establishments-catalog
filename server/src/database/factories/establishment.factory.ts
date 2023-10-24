import { Establishment } from '@/entities/establishment.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const EstablishmentFactory = setSeederFactory(Establishment, (faker: Faker) => {
    const establishment = new Establishment();
    establishment.name = faker.lorem.words(faker.number.int({ min: 1, max: 2 }));
    establishment.description = faker.lorem.words(20);

    const random = faker.number.int({ min: 1, max: 5 });
    establishment.userId = random;
    switch (random) {
        case 1:
            establishment.image = '1.jpg';
            break;
        case 2:
            establishment.image = '2.jpg';
            break;
        case 3:
            establishment.image = '3.jpg';
            break;
        case 4:
            establishment.image = '4.jpg';
            break;
        case 5:
            establishment.image = '5.jpg';
            break;
        default:
            break;
    }
    return establishment;
});

export default EstablishmentFactory;
