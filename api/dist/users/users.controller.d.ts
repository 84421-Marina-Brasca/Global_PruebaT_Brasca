import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        nombre: string;
        apellido: string;
        correo: string;
        edad: number;
        username: string;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").UpdateResult>;
}
