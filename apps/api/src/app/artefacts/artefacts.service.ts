import { Injectable } from '@nestjs/common';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';

@Injectable()
export class ArtefactsService {
  create(createArtefactDto: CreateArtefactDto) {
    return 'This action adds a new artefact';
  }

  findAll() {
    return `This action returns all artefacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artefact`;
  }

  update(id: number, updateArtefactDto: UpdateArtefactDto) {
    return `This action updates a #${id} artefact`;
  }

  remove(id: number) {
    return `This action removes a #${id} artefact`;
  }
}
