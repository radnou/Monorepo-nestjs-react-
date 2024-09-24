import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnvironmentSnapshotDto } from './dto/create-environment-snapshot.dto';
import { UpdateEnvironmentSnapshotDto } from './dto/update-environment-snapshot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentSnapshot } from './entities/environment-snapshot.entity';
import { SnapshotServiceVersion } from './entities/snapshot-service-version.entity';
import { ServiceVersion } from '../services/entities/service-version.entity';
import { Service } from '../services/entities/service.entity';
import { Environment } from '../environments/entities/environment.entity';

@Injectable()
export class EnvironmentSnapshotsService {
  constructor(
    @InjectRepository(Environment)
    private environmentsRepository: Repository<Environment>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(EnvironmentSnapshot)
    private snapshotsRepository: Repository<EnvironmentSnapshot>,
    @InjectRepository(ServiceVersion)
    private servicesVersionRepository: Repository<ServiceVersion>,
    @InjectRepository(SnapshotServiceVersion)
    private snapshotServicesVersionRepository: Repository<SnapshotServiceVersion>,
  ) {}

  async create(createEnvironmentSnapshotDto: CreateEnvironmentSnapshotDto): Promise<EnvironmentSnapshot> {
    const snapshot = this.snapshotsRepository.create(createEnvironmentSnapshotDto);
    return await this.snapshotsRepository.save(snapshot);
  }

  async findAll(): Promise<EnvironmentSnapshot[]> {
    return await this.snapshotsRepository.find();
  }

  async findOne(id: number): Promise<EnvironmentSnapshot> {
    const snapshot = await this.snapshotsRepository.findOne({ where: { id } });
    if (!snapshot) {
      throw new NotFoundException(`Environment Snapshot with ID ${id} not found`);
    }
    return snapshot;
  }

  async update(id: number, updateEnvironmentSnapshotDto: UpdateEnvironmentSnapshotDto): Promise<EnvironmentSnapshot> {
    const snapshot = await this.snapshotsRepository.preload({
      id,
      ...updateEnvironmentSnapshotDto,
    });
    if (!snapshot) {
      throw new NotFoundException(`Environment Snapshot with ID ${id} not found`);
    }
    return await this.snapshotsRepository.save(snapshot);
  }

  async remove(id: number): Promise<void> {
    const snapshot = await this.findOne(id);
    await this.snapshotsRepository.remove(snapshot);
  }
  async generateSnapshot(environmentId: number): Promise<EnvironmentSnapshot> {
    // Récupérer l'environnement
    const environment = await this.environmentsRepository.findOne({ where: { id: environmentId }, relations: ['services'] });
    if (!environment) {
      throw new NotFoundException(`Environment with ID ${environmentId} not found`);
    }

    // Récupérer tous les services de l'environnement
    const services = environment.services;  // Les services sont maintenant directement liés à l'environnement

    // Créer un nouveau snapshot pour cet environnement
    const snapshot = this.snapshotsRepository.create({
      name: `Snapshot-${new Date().toISOString()}`,
      description: `Snapshot for environment ${environment.name}`,
      creationDate: new Date(),
    });
    await this.snapshotsRepository.save(snapshot);

    // Capturer les versions actuelles des services
    for (const service of services) {
      const currentVersion = await this.servicesVersionRepository.findOne({ where: { service } });

      if (currentVersion) {
        const snapshotServiceVersion = this.snapshotServicesVersionRepository.create({
          snapshot,
          serviceVersion: currentVersion,
        });
        await this.snapshotServicesVersionRepository.save(snapshotServiceVersion);
      }
    }

    return snapshot;
  }

}
