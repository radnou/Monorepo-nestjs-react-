import { IsNumber } from 'class-validator';

export class CreateSnapshotServiceVersionDto {
  @IsNumber()
  snapshotId: number;

  @IsNumber()
  serviceVersionId: number;
}
