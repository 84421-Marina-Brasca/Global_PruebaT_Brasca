import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  /*Agrego un rol por logica aùn no sindo requerido en el enunciado, 
  tiene un valor default y no declare permisos asi que es opcional, 
  puede borrarse de momento*/

  @Column({ default: 'user' })
  rol: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
