import { validate } from 'class-validator';
import { ReviewDto } from '@/dto/review.dto';
import { ReviewRepository } from '@/repositories/review.repository';
import { Review } from '@/entities/review.entity';

export class ReviewService {
    private repository: ReviewRepository;

    constructor() {
        this.repository = new ReviewRepository();
    }

    getReviews = async (): Promise<Review[]> => {
        return await this.repository.getReviews();
    };

    getReviewsByEstablishment = async (establishmentId: number): Promise<Review[]> => {
        return await this.repository.getReviewsByEstablishment(establishmentId);
    };

    createReview = async (reviewDto: ReviewDto): Promise<Review> => {
        const errors = await validate(reviewDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.createReview(reviewDto);
    };

    deleteReview = async (id: number): Promise<void> => {
        return await this.repository.deleteReview(id);
    };
}
