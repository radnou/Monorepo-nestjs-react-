import { Module } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Environment} from "./entities/environment.entity";
import {EnvironmentSnapshot} from "../environment-snapshots/entities/environment-snapshot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Environment,EnvironmentSnapshot])],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
})
export class EnvironmentsModule {}
