import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Picture } from './picture.entity';
import { Review } from './review.entity';

@Entity('establishment')
export class Establishment {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    image!: string;
    @Column({ nullable: true, default: 3 })
    overallRate!: number;
    @Column({ nullable: true, default: 3 })
    avgFoodRate!: number;
    @Column({ nullable: true, default: 3 })
    avgInteriorRate!: number;
    @Column({ nullable: true, default: 3 })
    avgServiceRate!: number;
    @Column({ nullable: false })
    userId!: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user!: User;

    @OneToMany(() => Review, (review) => review.establishment, { onDelete: 'CASCADE' })
    reviews!: Review[];

    @OneToMany(() => Picture, (picture) => picture.establishment, { onDelete: 'CASCADE' })
    pictures!: Picture[];
}
