import { IsString, IsNumber } from 'class-validator';

export class CreateMigrationScriptDto {
  @IsString()
  scriptName: string;

  @IsString()
  scriptContent: string;

  @IsNumber()
  versionId: number;
}
