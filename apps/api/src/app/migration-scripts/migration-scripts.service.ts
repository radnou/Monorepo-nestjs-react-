import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMigrationScriptDto} from './dto/create-migration-script.dto';
import {UpdateMigrationScriptDto} from './dto/update-migration-script.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MigrationScript} from './entities/migration-script.entity';

@Injectable()
export class MigrationScriptsService {
  constructor(
    @InjectRepository(MigrationScript)
    private migrationScriptsRepository: Repository<MigrationScript>,
  ) {
  }

  async create(createMigrationScriptDto: CreateMigrationScriptDto): Promise<MigrationScript> {
    const migrationScript = this.migrationScriptsRepository.create(createMigrationScriptDto);
    return await this.migrationScriptsRepository.save(migrationScript);
  }

  async findAll(): Promise<MigrationScript[]> {
    return await this.migrationScriptsRepository.find();
  }

  async findOne(id: number): Promise<MigrationScript> {
    const migrationScript = await this.migrationScriptsRepository.findOne({where: {id}});
    if (!migrationScript) {
      throw new NotFoundException(`Migration Script with ID ${id} not found`);
    }
    return migrationScript;
  }

  async update(id: number, updateMigrationScriptDto: UpdateMigrationScriptDto): Promise<MigrationScript> {
    const migrationScript = await this.migrationScriptsRepository.preload({
      id,
      ...updateMigrationScriptDto,
    });
    if (!migrationScript) {
      throw new NotFoundException(`Migration Script with ID ${id} not found`);
    }
    return await this.migrationScriptsRepository.save(migrationScript);
  }

  async remove(id: number): Promise<void> {
    const migrationScript = await this.findOne(id);
    await this.migrationScriptsRepository.remove(migrationScript);
  }
}
