import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtefactsService } from './artefacts.service';
import { CreateArtefactDto } from './dto/create-artefact.dto';
import { UpdateArtefactDto } from './dto/update-artefact.dto';
import { Artefact } from './entities/artefact.entity';

@Controller('artefacts')
export class ArtefactsController {
  constructor(private readonly artefactsService: ArtefactsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtefactDto: CreateArtefactDto): Promise<Artefact> {
    return this.artefactsService.create(createArtefactDto);
  }

  @Get()
  findAll(): Promise<Artefact[]> {
    return this.artefactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Artefact> {
    return this.artefactsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateArtefactDto: UpdateArtefactDto,
  ): Promise<Artefact> {
    return this.artefactsService.update(+id, updateArtefactDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.artefactsService.remove(+id);
  }
}
