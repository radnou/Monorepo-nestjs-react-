import { IsString, IsNumber } from 'class-validator';

export class CreateDependencyDto {
  @IsString()
  dependencyType: string; // 'technique', 'métier', etc.

  @IsNumber()
  serviceId: number; // Le service qui a la dépendance

  @IsNumber()
  dependsOnServiceId: number; // Le service dont il dépend
}
