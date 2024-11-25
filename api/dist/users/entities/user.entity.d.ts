import { Profile } from '../../profiles/entities/profile.entity';
export declare class User {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    edad: number;
    deletedAt: Date;
    profile: Profile;
}
