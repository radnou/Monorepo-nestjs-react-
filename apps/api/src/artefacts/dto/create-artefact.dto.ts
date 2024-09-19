import { IsString, IsNumber } from 'class-validator';

export class CreateArtefactDto {
  @IsString()
  type: string; // 'rpm', 'container', etc.

  @IsString()
  nexusUrl: string;

  @IsNumber()
  versionId: number;
}
