import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateEnvironmentDto} from './dto/create-environment.dto';
import {UpdateEnvironmentDto} from './dto/update-environment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {Environment} from "./entities/environment.entity";


@Injectable()
export class EnvironmentsService {
  constructor(@InjectRepository(Environment) private readonly environmentsRepository: Repository<Environment>) {
  }

  async create(createEnvironmentDto: CreateEnvironmentDto): Promise<Environment> {
    const environment = this.environmentsRepository.create(createEnvironmentDto);
    return await this.environmentsRepository.save(environment);
  }

  async findAll(): Promise<Environment[]> {
    return await this.environmentsRepository.find({});
  }

  async findOne(id: number): Promise<Environment> {
    return await this.environmentsRepository.findOne({
      where: {id: id}
    });
  }

  async update(id: number, updateEnvironmentDto: UpdateEnvironmentDto): Promise<Environment> {

    const environment: Environment = await this.environmentsRepository.preload({
      id: id,
      ...updateEnvironmentDto,
    });
    if (!environment) {
      throw new NotFoundException(`Environment with ID ${id} not found`);
    }
    return await this.environmentsRepository.save(environment);
  }

  async remove(id: number): Promise<void> {
    const environment: Environment = await this.findOne(
        id
      )
    ;
    if (!environment) {
      throw new NotFoundException(`Environment with ID ${id} not found`);
    }
    await this.environmentsRepository.remove(environment);
  }
}
