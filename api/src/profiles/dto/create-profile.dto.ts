import { Transform } from 'class-transformer';
import {
  IsPositive,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  username: string;

  @IsPositive()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  password: string;

  @IsString()
  rol?: string;
}
