import crypto from 'crypto';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { Establishment } from './establishment.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true })
    username!: string;
    @Column()
    password!: string;
    @Column({ nullable: true, type: 'varchar' })
    token?: string;
    @Column({ default: 'user' })
    role!: 'user' | 'admin';

    @OneToMany(() => Establishment, (establishment) => establishment.user, { onDelete: 'CASCADE' })
    establishments!: Establishment[];

    @BeforeInsert()
    async hashPassword() {
        const SALT_WORK_FACTOR = 10;
        if (this.password) {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    generateToken() {
        this.token = crypto.randomUUID();
    }
}
