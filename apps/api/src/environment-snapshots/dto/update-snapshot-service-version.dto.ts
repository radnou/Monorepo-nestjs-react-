import { PartialType } from '@nestjs/mapped-types';
import { CreateSnapshotServiceVersionDto } from './create-snapshot-service-version.dto';

export class UpdateSnapshotServiceVersionDto extends PartialType(CreateSnapshotServiceVersionDto) {}
