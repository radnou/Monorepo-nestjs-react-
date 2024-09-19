import { Injectable } from '@nestjs/common';
import { CreateEnvironmentSnapshotDto } from './dto/create-environment-snapshot.dto';
import { UpdateEnvironmentSnapshotDto } from './dto/update-environment-snapshot.dto';

@Injectable()
export class EnvironmentSnapshotsService {
  create(createEnvironmentSnapshotDto: CreateEnvironmentSnapshotDto) {
    return 'This action adds a new environmentSnapshot';
  }

  findAll() {
    return `This action returns all environmentSnapshots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} environmentSnapshot`;
  }

  update(id: number, updateEnvironmentSnapshotDto: UpdateEnvironmentSnapshotDto) {
    return `This action updates a #${id} environmentSnapshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} environmentSnapshot`;
  }
}
