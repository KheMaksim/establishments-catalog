import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class EstablishmentDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле name обязательное' })
    @IsString()
    name!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле description обязательное' })
    @IsString()
    description!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле image обязательное' })
    @IsString()
    image!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле checked обязательное' })
    @IsString()
    checked!: string;

    @Expose()
    @IsNotEmpty()
    @IsNumberString()
    userId!: number;
}
