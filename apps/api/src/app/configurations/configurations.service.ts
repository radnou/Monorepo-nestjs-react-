import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateConfigurationDto} from './dto/create-configuration.dto';
import {UpdateConfigurationDto} from './dto/update-configuration.dto';
import {Configuration} from "./entities/configuration.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ConfigurationsService {

  constructor(
    @InjectRepository(Configuration)
    private configurationsRepository: Repository<Configuration>
  ) {
  }

  async create(createConfigurationDto: CreateConfigurationDto): Promise<Configuration> {
    const configuration = this.configurationsRepository.create(createConfigurationDto);
    await this.configurationsRepository.save(configuration);
    return configuration;
  }

  async findAll(): Promise<Configuration[]> {

    return await this.configurationsRepository.find()
  }

  async findOne(id: number): Promise<Configuration> {
    const configuration = await this.configurationsRepository.findOne(
      {where: {id}}
    );
    if (!configuration) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }
    return configuration;
  }

  async update(id: number, updateConfigurationDto: UpdateConfigurationDto): Promise<Configuration> {
    const configuration = this.configurationsRepository.preload({id, ...updateConfigurationDto});
    if (!configuration) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }
    return await this.configurationsRepository.save(updateConfigurationDto);
  }



  async remove(id: number): Promise<void> {
    const configuration = await this.findOne(+id);
    await this.configurationsRepository.remove(configuration);
  }
}
