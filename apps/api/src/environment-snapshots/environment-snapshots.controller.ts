import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnvironmentSnapshotsService } from './environment-snapshots.service';
import { CreateEnvironmentSnapshotDto } from './dto/create-environment-snapshot.dto';
import { UpdateEnvironmentSnapshotDto } from './dto/update-environment-snapshot.dto';

@Controller('environment-snapshots')
export class EnvironmentSnapshotsController {
  constructor(private readonly environmentSnapshotsService: EnvironmentSnapshotsService) {}

  @Post()
  create(@Body() createEnvironmentSnapshotDto: CreateEnvironmentSnapshotDto) {
    return this.environmentSnapshotsService.create(createEnvironmentSnapshotDto);
  }

  @Get()
  findAll() {
    return this.environmentSnapshotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentSnapshotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvironmentSnapshotDto: UpdateEnvironmentSnapshotDto) {
    return this.environmentSnapshotsService.update(+id, updateEnvironmentSnapshotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentSnapshotsService.remove(+id);
  }
}
