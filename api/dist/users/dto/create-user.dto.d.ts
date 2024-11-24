import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
export declare class CreateUserDto {
    nombre: string;
    apellido: string;
    correo: string;
    edad: number;
    profile: CreateProfileDto;
}
