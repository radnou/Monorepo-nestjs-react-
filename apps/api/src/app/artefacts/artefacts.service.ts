import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artefact } from './entities/artefact.entity';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';
import { Version } from '../versions/entities/version.entity';

@Injectable()
export class ArtefactsService {
  constructor(
    @InjectRepository(Artefact)
    private readonly artefactsRepository: Repository<Artefact>,
    @InjectRepository(Version)
    private readonly versionsRepository: Repository<Version>,
  ) {}

  async create(createArtefactDto: CreateArtefactDto): Promise<Artefact> {
    const version = await this.versionsRepository.findOne({
      where: { id: createArtefactDto.versionId },
    });
    if (!version) {
      throw new NotFoundException(`Version with ID ${createArtefactDto.versionId} not found`);
    }

    const artefact = this.artefactsRepository.create({
      type: createArtefactDto.type,
      nexusUrl: createArtefactDto.nexusUrl,
      version: version,
    });
    return await this.artefactsRepository.save(artefact);
  }

  async findAll(): Promise<Artefact[]> {
    return await this.artefactsRepository.find({
      relations: ['version'],
    });
  }

  async findOne(id: number): Promise<Artefact> {
    const artefact = await this.artefactsRepository.findOne({
      where: { id },
      relations: ['version'],
    });
    if (!artefact) {
      throw new NotFoundException(`Artefact with ID ${id} not found`);
    }
    return artefact;
  }

  async update(id: number, updateArtefactDto: UpdateArtefactDto): Promise<Artefact> {
    const artefact = await this.artefactsRepository.preload({
      id: id,
      ...updateArtefactDto,
    });

    if (!artefact) {
      throw new NotFoundException(`Artefact with ID ${id} not found`);
    }

    if (updateArtefactDto.versionId) {
      const version = await this.versionsRepository.findOne({
        where: { id: updateArtefactDto.versionId },
      });
      if (!version) {
        throw new NotFoundException(`Version with ID ${updateArtefactDto.versionId} not found`);
      }
      artefact.version = version;
    }

    return await this.artefactsRepository.save(artefact);
  }

  async remove(id: number): Promise<void> {
    const artefact = await this.findOne(id);
    await this.artefactsRepository.remove(artefact);
  }
}
