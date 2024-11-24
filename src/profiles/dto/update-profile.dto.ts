import {
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
  @IsOptional()
  @IsPositive()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
