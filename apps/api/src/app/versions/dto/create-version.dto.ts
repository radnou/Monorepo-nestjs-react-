import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  versionNumber: string;

  @IsString()
  commitHash: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @IsNumber()
  serviceId: number;
}
