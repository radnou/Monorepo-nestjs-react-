import {NotFoundException} from '@nestjs/common';
import {CreateDependencyDto} from './dto/create-dependency.dto';
import {UpdateDependencyDto} from './dto/update-dependency.dto';
import {Repository} from "typeorm";
import {Dependency} from "./entities/dependency.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Service} from "../services/entities/service.entity";


export class DependenciesService {

  constructor(
    @InjectRepository(Dependency) private dependenciesRepository: Repository<Dependency>,
    @InjectRepository(Service) private servicesRepository: Repository<Service>,
  ) {}

  async checkService(dependency: Dependency) {
    // Vérification du service principal
    if (!dependency.service || !dependency.service.id) {
      const service = await this.servicesRepository.findOne({ where: { id: dependency.service?.id } });
      if (!service) {
        throw new NotFoundException(`Service with ID ${dependency.service?.id} not found`);
      }
    }

    // Vérification du service dépendant
    if (!dependency.dependsOnService || !dependency.dependsOnService.id) {
      const dependsService = await this.servicesRepository.findOne({ where: { id: dependency.dependsOnService?.id } });
      if (!dependsService) {
        throw new NotFoundException(`Depends on Service with ID ${dependency.dependsOnService?.id} not found`);
      }
    }
  }

  async create(createDependencyDto: CreateDependencyDto): Promise<Dependency> {
    const dependency = this.dependenciesRepository.create(createDependencyDto);
    await this.checkService(dependency);  // Utilisation de await ici
    await this.dependenciesRepository.save(dependency);
    return dependency;
  }

  async findAll(): Promise<Dependency[]> {
    return await this.dependenciesRepository.find();
  }

  async findOne(id: number): Promise<Dependency> {
    const dependency = await this.dependenciesRepository.findOne({ where: { id } });
    if (!dependency) {
      throw new NotFoundException(`Dependency with ID ${id} not found`);
    }
    return dependency;
  }

  async update(id: number, updateDependencyDto: UpdateDependencyDto): Promise<Dependency> {
    const dependency = await this.dependenciesRepository.preload({
      id,
      ...updateDependencyDto,
    });
    if (!dependency) {
      throw new NotFoundException(`Dependency with ID ${id} not found`);
    }
    return await this.dependenciesRepository.save(dependency);
  }

  async remove(id: number): Promise<void> {
    const dependency = await this.findOne(id);
    await this.dependenciesRepository.remove(dependency);
  }
}

