import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>);
    create(createUserDto: CreateUserDto): Promise<{
        nombre: string;
        apellido: string;
        correo: string;
        edad: number;
        username: string;
    }>;
    findOneByEmail(correo: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
