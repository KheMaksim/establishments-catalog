import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { EstablishmentService } from '@/service/establishment.service';
import { EstablishmentDto } from '@/dto/establishment.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/IRequest.interface';

export class EstablishmentController {
    private service: EstablishmentService;

    constructor() {
        this.service = new EstablishmentService();
    }

    getEstablishments: RequestHandler = async (req, res) => {
        try {
            const establishments = await this.service.getEstablishments();
            return res.send(establishments);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    getEstablishmentById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found establishments by this id:${id}`);
            }
            const establishments = await this.service.getEstablishmentById(Number(id));
            return res.send(establishments);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createEstablishment: RequestHandler = async (req: IRequest, res) => {
        try {
            const establishmentDto = plainToClass(EstablishmentDto, req.body, { excludeExtraneousValues: true });
            if (req.file) establishmentDto.image = req.file.filename;
            establishmentDto.userId = req.user.id.toString();
            if (establishmentDto.checked === 'false') {
                throw new Error(`Privacy policy not accepted`);
            }
            const establishment = await this.service.createEstablishment(establishmentDto);
            return res.send(establishment);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    deleteEstablishment: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            const establishment = await this.service.deleteEstablishment(Number(id));
            return res.send(establishment);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
