import { IsString, IsNumber } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  serviceType: string; // 'nexus', 'git', 'gerrit', etc.

  @IsString()
  username: string;

  @IsString()
  encryptedPassword: string;

  @IsNumber()
  environmentId: number;
}
