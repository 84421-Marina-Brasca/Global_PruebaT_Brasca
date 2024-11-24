import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsObject,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  apellido: string;

  @IsEmail()
  correo: string;

  @IsInt()
  @IsPositive()
  edad: number;

  @IsObject()
  profile: CreateProfileDto;
}
