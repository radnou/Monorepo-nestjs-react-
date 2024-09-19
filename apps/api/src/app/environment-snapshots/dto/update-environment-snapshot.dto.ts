import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvironmentSnapshotDto } from './create-environment-snapshot.dto';

export class UpdateEnvironmentSnapshotDto extends PartialType(CreateEnvironmentSnapshotDto) {}
