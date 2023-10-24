import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import 'reflect-metadata';
import { AuthRouter } from './routes/auth.route';
import { EstablishmentRouter } from './routes/establishment.route';
import { ReviewRouter } from './routes/review.route';
import { PictureRouter } from './routes/picture.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    routers: [new AuthRouter(), new EstablishmentRouter(), new ReviewRouter(), new PictureRouter()],
});

app.listen();
