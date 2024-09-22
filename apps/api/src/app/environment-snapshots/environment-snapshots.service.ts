import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnvironmentSnapshotDto } from './dto/create-environment-snapshot.dto';
import { UpdateEnvironmentSnapshotDto } from './dto/update-environment-snapshot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentSnapshot } from './entities/environment-snapshot.entity';

@Injectable()
export class EnvironmentSnapshotsService {
  constructor(
    @InjectRepository(EnvironmentSnapshot)
    private environmentSnapshotsRepository: Repository<EnvironmentSnapshot>,
  ) {}

  async create(createEnvironmentSnapshotDto: CreateEnvironmentSnapshotDto): Promise<EnvironmentSnapshot> {
    const snapshot = this.environmentSnapshotsRepository.create(createEnvironmentSnapshotDto);
    return await this.environmentSnapshotsRepository.save(snapshot);
  }

  async findAll(): Promise<EnvironmentSnapshot[]> {
    return await this.environmentSnapshotsRepository.find();
  }

  async findOne(id: number): Promise<EnvironmentSnapshot> {
    const snapshot = await this.environmentSnapshotsRepository.findOne({ where: { id } });
    if (!snapshot) {
      throw new NotFoundException(`Environment Snapshot with ID ${id} not found`);
    }
    return snapshot;
  }

  async update(id: number, updateEnvironmentSnapshotDto: UpdateEnvironmentSnapshotDto): Promise<EnvironmentSnapshot> {
    const snapshot = await this.environmentSnapshotsRepository.preload({
      id,
      ...updateEnvironmentSnapshotDto,
    });
    if (!snapshot) {
      throw new NotFoundException(`Environment Snapshot with ID ${id} not found`);
    }
    return await this.environmentSnapshotsRepository.save(snapshot);
  }

  async remove(id: number): Promise<void> {
    const snapshot = await this.findOne(id);
    await this.environmentSnapshotsRepository.remove(snapshot);
  }
}
