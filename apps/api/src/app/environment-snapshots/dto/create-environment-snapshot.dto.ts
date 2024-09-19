import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateEnvironmentSnapshotDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  creationDate: Date;

  @IsString()
  environment: string; // Ou  environmentId si  relation avec l'entité Environment

  //  propriétés pour les associations, par exemple :
  // @IsArray()
  // @IsNumber({}, { each: true })
  // serviceVersionIds: number[];
}
