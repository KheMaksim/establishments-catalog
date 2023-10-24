import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Review } from '@/entities/review.entity';
import { ReviewDto } from '@/dto/review.dto';

export class ReviewRepository extends Repository<Review> {
    constructor() {
        super(Review, appDataSource.createEntityManager());
    }

    async getReviews() {
        return await this.find();
    }

    async getReviewsByEstablishment(establishmentId: number) {
        const reviews = await this.find({
            where: { establishmentId },
            order: { datetime: 'DESC' },
            relations: { user: true },
        });
        return reviews;
    }

    async createReview(reviewDto: ReviewDto) {
        const review = {
            ...reviewDto,
            datetime: new Date(),
        };
        const newReview = await this.save(review);
        return newReview;
    }

    async deleteReview(id: number): Promise<void> {
        await this.delete(id);
    }
}
