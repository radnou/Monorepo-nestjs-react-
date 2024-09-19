import { PartialType } from '@nestjs/mapped-types';
import { CreateMigrationScriptDto } from './create-migration-script.dto';

export class UpdateMigrationScriptDto extends PartialType(CreateMigrationScriptDto) {}
