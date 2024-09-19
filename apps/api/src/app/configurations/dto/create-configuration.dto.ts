import { IsString, IsNumber } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsNumber()
  serviceId: number;

  @IsNumber()
  environmentId: number;
}
