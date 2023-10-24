import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { ReviewService } from '@/service/review.service';
import { ReviewDto } from '@/dto/review.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/IRequest.interface';

export class ReviewController {
    private service: ReviewService;

    constructor() {
        this.service = new ReviewService();
    }

    getReviews: RequestHandler = async (req, res) => {
        try {
            const reviews = await this.service.getReviews();
            return res.send(reviews);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    getReviewsByEstablishment: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found reviews by this establishment id:${id}`);
            }
            const reviews = await this.service.getReviewsByEstablishment(Number(id));
            return res.send(reviews);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createReview: RequestHandler = async (req: IRequest, res) => {
        const reviewDto = plainToInstance(ReviewDto, req.body, { excludeExtraneousValues: true });
        reviewDto.userId = req.user.id.toString();
        try {
            const review = await this.service.createReview(reviewDto);
            return res.send(review);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    deleteReview: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            const review = await this.service.deleteReview(Number(id));
            return res.send(review);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
