import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ReviewDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле text обязательное' })
    @IsString()
    text!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле serviceRate обязательное' })
    serviceRate!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле interiorRate обязательное' })
    interiorRate!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле foodRate обязательное' })
    foodRate!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле userId обязательное' })
    @IsNumberString()
    userId!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле establishmentId обязательное' })
    @IsNumberString()
    establishmentId!: number;
}
