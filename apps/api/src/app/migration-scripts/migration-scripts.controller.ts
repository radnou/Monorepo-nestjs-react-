import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MigrationScriptsService } from './migration-scripts.service';
import { CreateMigrationScriptDto } from './dto/create-migration-script.dto';
import { UpdateMigrationScriptDto } from './dto/update-migration-script.dto';

@Controller('migration-scripts')
export class MigrationScriptsController {
  constructor(private readonly migrationScriptsService: MigrationScriptsService) {}

  @Post()
  create(@Body() createMigrationScriptDto: CreateMigrationScriptDto) {
    return this.migrationScriptsService.create(createMigrationScriptDto);
  }

  @Get()
  findAll() {
    return this.migrationScriptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.migrationScriptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMigrationScriptDto: UpdateMigrationScriptDto) {
    return this.migrationScriptsService.update(+id, updateMigrationScriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.migrationScriptsService.remove(+id);
  }
}
