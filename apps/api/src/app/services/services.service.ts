import {Injectable} from '@nestjs/common';
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

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
