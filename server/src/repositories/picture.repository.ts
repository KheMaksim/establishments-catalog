import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Picture } from '@/entities/picture.entity';
import { PictureDto } from '@/dto/picture.dto';

export class PictureRepository extends Repository<Picture> {
    constructor() {
        super(Picture, appDataSource.createEntityManager());
    }

    async getPictures(establishmentId: number) {
        return await this.find({
            where: { establishmentId },
        });
    }

    async createPicture(pictureDto: PictureDto) {
        const picture = await this.save(pictureDto);
        return picture;
    }

    async deletePicture(id: number): Promise<void> {
        await this.delete(id);
    }
}
