import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsString()
    @IsOptional()
    username?: string;
  
    @IsDate()
    @IsOptional()
    birthdate?: Date;
  }