import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Artefact} from "../artefacts/entities/artefact.entity";
import {Credential} from "./entities/credential.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
