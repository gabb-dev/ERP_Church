import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateMinistryDto {
  @IsString()
  name: string;

  @IsString()
  branch: string;

  @IsUUID()
  lead_ministry: string;

  @IsArray()
  @IsOptional()
  members?: string[];
}

export class UpdateMinistryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  branch?: string;

  @IsUUID()
  @IsOptional()
  lead_ministry?: string;

  @IsArray()
  @IsOptional()
  members?: string[];
}
