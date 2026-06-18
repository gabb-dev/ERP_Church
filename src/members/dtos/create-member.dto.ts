import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
  IsArray,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '@/common/types/address';

export class CreateMemberDto {
  @IsString()
  full_name: string;

  @IsString()
  social_name: string;

  @IsDateString()
  date_birth: string;

  @IsDateString()
  date_baptism: string;

  @IsString()
  sex: 'M' | 'F';

  @IsNumberString()
  telephone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsOptional()
  ministrys?: string[];

  @IsObject()
  @IsOptional()
  address?: Address;
}

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  social_name?: string;

  @IsString()
  @IsOptional()
  sex?: 'M' | 'F';

  @IsNumberString()
  @IsOptional()
  telephone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsObject()
  @IsOptional()
  address?: Address;
}
