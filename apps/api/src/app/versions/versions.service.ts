import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './entities/version.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class VersionsService {
  constructor(
    @InjectRepository(Version)
    private readonly versionsRepository: Repository<Version>,
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async create(createVersionDto: CreateVersionDto): Promise<Version> {
    const service = await this.servicesRepository.findOne({
      where: { id: createVersionDto.serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Service with ID ${createVersionDto.serviceId} not found`,
      );
    }

    const version = this.versionsRepository.create({
      ...createVersionDto,
      service: service,
    });
    return await this.versionsRepository.save(version);
  }

  async findAll(): Promise<Version[]> {
    return await this.versionsRepository.find({
      relations: ['service'],
    });
  }

  async findOne(id: number): Promise<Version> {
    const version = await this.versionsRepository.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!version) {
      throw new NotFoundException(`Version with ID ${id} not found`);
    }
    return version;
  }

  async update(
    id: number,
    updateVersionDto: UpdateVersionDto,
  ): Promise<Version> {
    const version = await this.versionsRepository.preload({
      id: id,
      ...updateVersionDto,
    });

    if (!version) {
      throw new NotFoundException(`Version with ID ${id} not found`);
    }

    if (updateVersionDto.serviceId) {
      const service = await this.servicesRepository.findOne({
        where: { id: updateVersionDto.serviceId },
      });
      if (!service) {
        throw new NotFoundException(
          `Service with ID ${updateVersionDto.serviceId} not found`,
        );
      }
      version.service = service;
    }

    return await this.versionsRepository.save(version);
  }

  async remove(id: number): Promise<void> {
    const version = await this.findOne(id);
    await this.versionsRepository.remove(version);
  }
}
