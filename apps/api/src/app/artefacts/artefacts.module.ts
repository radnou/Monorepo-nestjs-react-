import { Module } from '@nestjs/common';
import { ArtefactsService } from './artefacts.service';
import { ArtefactsController } from './artefacts.controller';
import {Artefact} from "./entities/artefact.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Version} from "../versions/entities/version.entity";
import {Credential} from "../credentials/entities/credential.entity";
import {Service} from "../services/entities/service.entity";

@Module({
imports: [TypeOrmModule.forFeature([Artefact,Version,Credential,Service])],
  controllers: [ArtefactsController],
  providers: [ArtefactsService],
})
export class ArtefactsModule {}
