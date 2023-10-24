import { PictureController } from '@/controllers/picture.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class PictureRouter implements IRoute {
    public path = '/pictures';
    router: Router = Router();
    private controller: PictureController;

    constructor() {
        this.controller = new PictureController();
        this.init();
    }
    private init() {
        this.router.get('/:id', this.controller.getPictures);
        this.router.post('/', authValidate, upload.single('image'), this.controller.createPicture);
        this.router.delete('/delete/:id', authValidate, checkRole('admin'), this.controller.deletePicture);
    }
}
