import { IsString, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  gitRepoUrl: string;

  @IsOptional()
  @IsString()
  gerritUrl?: string;

  @IsString()
  configDirectory: string;

  @IsString()
  logDirectory: string;

  @IsString()
  defaultLogLevel: string;
}
