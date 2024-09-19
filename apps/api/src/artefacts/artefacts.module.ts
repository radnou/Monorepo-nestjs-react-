import { Module } from '@nestjs/common';
import { ArtefactsService } from './artefacts.service';
import { ArtefactsController } from './artefacts.controller';

@Module({
  controllers: [ArtefactsController],
  providers: [ArtefactsService],
})
export class ArtefactsModule {}
