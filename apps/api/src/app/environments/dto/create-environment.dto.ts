import { IsString } from 'class-validator';

export class CreateEnvironmentDto {
  @IsString()
  name: string; // 'dev', 'test', 'prod', etc.
}
