import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false, unique: true })
  correo: string;

  @Column({ nullable: true })
  edad: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Profile, { nullable: true })
  @JoinColumn()
  profile: Profile;
}
