import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsEmail,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombre?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  @IsOptional()
  apellido?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  edad?: number;
}
