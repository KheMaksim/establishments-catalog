import { Picture } from '@/entities/picture.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const PictureFactory = setSeederFactory(Picture, (faker: Faker) => {
    const picture = new Picture();
    const random = faker.number.int({ min: 1, max: 5 });
    picture.establishmentId = random;
    picture.userId = random;
    switch (random) {
        case 1:
            picture.image = '1.jpg';
            break;
        case 2:
            picture.image = '2.jpg';
            break;
        case 3:
            picture.image = '3.jpg';
            break;
        case 4:
            picture.image = '4.jpg';
            break;
        case 5:
            picture.image = '5.jpg';
            break;
        default:
            break;
    }
    return picture;
});

export default PictureFactory;
