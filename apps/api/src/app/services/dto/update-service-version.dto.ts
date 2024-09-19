import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceVersionDto } from './create-service-version.dto';

export class UpdateServiceVersionDto extends PartialType(CreateServiceVersionDto) {}
