import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Establishment } from '@/entities/establishment.entity';
import { EstablishmentDto } from '@/dto/establishment.dto';

export class EstablishmentRepository extends Repository<Establishment> {
    constructor() {
        super(Establishment, appDataSource.createEntityManager());
    }

    async getEstablishments() {
        return await this.find({
            relations: { reviews: true, pictures: true },
        });
    }

    async getEstablishmentById(id: number) {
        const establishment = await this.findOne({
            where: { id },
            relations: { reviews: true },
        });
        return establishment;
    }

    async createEstablishment(establishmentDto: EstablishmentDto) {
        const establishment = await this.save(establishmentDto);
        return establishment;
    }

    async deleteEstablishment(id: number): Promise<void> {
        await this.delete(id);
    }
}
