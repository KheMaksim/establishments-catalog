import { ReviewController } from '@/controllers/review.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { Router } from 'express';

export class ReviewRouter implements IRoute {
    public path = '/reviews';
    router: Router = Router();
    private controller: ReviewController;

    constructor() {
        this.controller = new ReviewController();
        this.init();
    }
    private init() {
        this.router.get('/', this.controller.getReviews);
        this.router.get('/:id', this.controller.getReviewsByEstablishment);
        this.router.post('/', authValidate, this.controller.createReview);
        this.router.delete('/delete/:id', authValidate, checkRole('admin'), this.controller.deleteReview);
    }
}
