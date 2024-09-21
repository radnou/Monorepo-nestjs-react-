import { Module } from '@nestjs/common';
import { ArtefactsService } from './artefacts.service';
import { ArtefactsController } from './artefacts.controller';
import {Artefact} from "./entities/artefact.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Version} from "../versions/entities/version.entity";

@Module({
imports: [TypeOrmModule.forFeature([Artefact,Version])],
  controllers: [ArtefactsController],
  providers: [ArtefactsService],
})
export class ArtefactsModule {}
