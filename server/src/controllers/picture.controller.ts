import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { PictureService } from '@/service/picture.service';
import { PictureDto } from '@/dto/picture.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/IRequest.interface';

export class PictureController {
    private service: PictureService;

    constructor() {
        this.service = new PictureService();
    }

    getPictures: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found pictures by this establishment id:${id}`);
            }
            const pictures = await this.service.getPictures(Number(id));
            return res.send(pictures);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createPicture: RequestHandler = async (req: IRequest, res) => {
        const pictureDto = plainToClass(PictureDto, req.body, { excludeExtraneousValues: true });
        if (req.file) pictureDto.image = req.file.filename;
        pictureDto.userId = req.user.id.toString();
        try {
            const picture = await this.service.createPicture(pictureDto);
            return res.send(picture);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    deletePicture: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            const picture = await this.service.deletePicture(Number(id));
            return res.send(picture);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
