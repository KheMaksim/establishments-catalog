import { Review } from '@/entities/review.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const ReviewFactory = setSeederFactory(Review, (faker: Faker) => {
    const review = new Review();
    review.text = faker.lorem.paragraph(faker.number.int({ min: 1, max: 2 }));
    review.datetime = faker.date.anytime();

    review.serviceRate = faker.number.int({ min: 1, max: 5 });
    review.foodRate = faker.number.int({ min: 1, max: 5 });
    review.interiorRate = faker.number.int({ min: 1, max: 5 });

    const random = faker.number.int({ min: 1, max: 5 });
    review.establishmentId = random;
    review.userId = random;
    return review;
});

export default ReviewFactory;
