import { validate } from 'class-validator';
import { PictureDto } from '@/dto/picture.dto';
import { PictureRepository } from '@/repositories/picture.repository';
import { Picture } from '@/entities/picture.entity';

export class PictureService {
    private repository: PictureRepository;

    constructor() {
        this.repository = new PictureRepository();
    }

    getPictures = async (establishmentId: number): Promise<Picture[]> => {
        return await this.repository.getPictures(establishmentId);
    };

    createPicture = async (pictureDto: PictureDto): Promise<Picture> => {
        const errors = await validate(pictureDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.createPicture(pictureDto);
    };

    deletePicture = async (id: number): Promise<void> => {
        return await this.repository.deletePicture(id);
    };
}
