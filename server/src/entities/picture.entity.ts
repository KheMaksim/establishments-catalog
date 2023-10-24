import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Establishment } from './establishment.entity';

@Entity('picture')
export class Picture {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    image!: string;

    @Column()
    establishmentId!: number;
    @Column({ nullable: false })
    userId!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Establishment, (establishment) => establishment.pictures, { onDelete: 'CASCADE' })
    establishment!: Establishment;
}
