import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class PictureDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле image обязательное' })
    @IsString()
    image!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле establishmentId обязательное' })
    @IsNumberString()
    establishmentId!: number;

    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    userId!: number;
}
