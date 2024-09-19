import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {ServiceVersion} from "./entities/service-version.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Service} from "./entities/service.entity";

@Injectable()
export class ServicesService {

  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    @InjectRepository(ServiceVersion)
    private serviceVersionsRepository: Repository<ServiceVersion>,
  ) {
  }

 public async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto);
    await this.servicesRepository.save(service);

    // Créez une ServiceVersion par défaut si nécessaire
    const serviceVersion = new ServiceVersion();
    serviceVersion.service = service;
    // Associez une version si nécessaire
    await this.serviceVersionsRepository.save(serviceVersion);

    return service;
  }
  async findAll(): Promise<Service[]> {
    return await this.servicesRepository.find();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.servicesRepository.preload({
      id: id,
      ...updateServiceDto,
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return await this.servicesRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.servicesRepository.remove(service);
  }
}
