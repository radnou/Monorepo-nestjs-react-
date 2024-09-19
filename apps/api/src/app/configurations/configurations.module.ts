import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Artefact} from "../artefacts/entities/artefact.entity";
import {Configuration} from "./entities/configuration.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
})
export class ConfigurationsModule {}
