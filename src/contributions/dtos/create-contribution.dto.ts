import { IsString, IsNumber, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class CreateContributionDto {
  @IsString()
  type: 'dizimo' | 'oferta';

  @IsUUID()
  member: string;

  @IsNumber()
  value: number;

  @IsDateString()
  date: string;

  @IsString()
  payment_type: string;
}

export class UpdateContributionDto {
  @IsString()
  @IsOptional()
  type?: 'dizimo' | 'oferta';

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  payment_type?: string;
}
