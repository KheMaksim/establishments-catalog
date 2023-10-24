import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Establishment } from './establishment.entity';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    text!: string;
    @Column()
    serviceRate!: number;
    @Column()
    interiorRate!: number;
    @Column()
    foodRate!: number;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    datetime!: Date;

    @Column()
    establishmentId!: number;
    @Column({ nullable: false })
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Establishment, (establishment) => establishment.reviews, { onDelete: 'CASCADE' })
    establishment!: Establishment;
}
