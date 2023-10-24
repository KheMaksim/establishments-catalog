import { EstablishmentController } from '@/controllers/establishment.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class EstablishmentRouter implements IRoute {
    public path = '/establishments';
    router: Router = Router();
    private controller: EstablishmentController;

    constructor() {
        this.controller = new EstablishmentController();
        this.init();
    }
    private init() {
        this.router.get('/', this.controller.getEstablishments);
        this.router.get('/:id', this.controller.getEstablishmentById);
        this.router.post('/', authValidate, upload.single('image'), this.controller.createEstablishment);
        this.router.delete('/delete/:id', authValidate, checkRole('admin'), this.controller.deleteEstablishment);
    }
}
