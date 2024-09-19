import { IsNumber } from 'class-validator';

export class CreateServiceVersionDto {
  @IsNumber()
  serviceId: number;

  @IsNumber()
  versionId: number;
}
