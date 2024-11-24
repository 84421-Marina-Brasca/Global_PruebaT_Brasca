import { User } from 'src/users/entities/user.entity';
export declare class Profile {
    id: number;
    password: string;
    username: string;
    rol: string;
    deletedAt: Date;
    user: User;
}
