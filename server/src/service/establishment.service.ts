import { validate } from 'class-validator';
import { EstablishmentDto } from '@/dto/establishment.dto';
import { EstablishmentRepository } from '@/repositories/establishment.repository';
import { Establishment } from '@/entities/establishment.entity';
import calculateAvg from '@/helpers/calculateAvg';

export class EstablishmentService {
    private repository: EstablishmentRepository;

    constructor() {
        this.repository = new EstablishmentRepository();
    }

    getEstablishments = async (): Promise<Establishment[]> => {
        const establishments = await this.repository.getEstablishments();
        establishments.map((establishment) => {
            calculateAvg(establishment);
        });
        return establishments;
    };

    getEstablishmentById = async (id: number): Promise<Establishment | null> => {
        const establishment = await this.repository.getEstablishmentById(id);
        if (establishment) {
            calculateAvg(establishment);
        }
        return establishment;
    };

    createEstablishment = async (establishmentDto: EstablishmentDto): Promise<Establishment> => {
        const errors = await validate(establishmentDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.createEstablishment(establishmentDto);
    };

    deleteEstablishment = async (id: number): Promise<void> => {
        return await this.repository.deleteEstablishment(id);
    };
}
