import { Injectable } from '@nestjs/common';
import { CreateMigrationScriptDto } from './dto/create-migration-script.dto';
import { UpdateMigrationScriptDto } from './dto/update-migration-script.dto';

@Injectable()
export class MigrationScriptsService {
  create(createMigrationScriptDto: CreateMigrationScriptDto) {
    return 'This action adds a new migrationScript';
  }

  findAll() {
    return `This action returns all migrationScripts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} migrationScript`;
  }

  update(id: number, updateMigrationScriptDto: UpdateMigrationScriptDto) {
    return `This action updates a #${id} migrationScript`;
  }

  remove(id: number) {
    return `This action removes a #${id} migrationScript`;
  }
}
