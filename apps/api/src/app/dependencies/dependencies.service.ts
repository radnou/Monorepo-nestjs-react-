import { Injectable } from '@nestjs/common';
import { CreateDependencyDto } from './dto/create-dependency.dto';
import { UpdateDependencyDto } from './dto/update-dependency.dto';

@Injectable()
export class DependenciesService {
  create(createDependencyDto: CreateDependencyDto) {
    return 'This action adds a new dependency';
  }

  findAll() {
    return `This action returns all dependencies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dependency`;
  }

  update(id: number, updateDependencyDto: UpdateDependencyDto) {
    return `This action updates a #${id} dependency`;
  }

  remove(id: number) {
    return `This action removes a #${id} dependency`;
  }
}
