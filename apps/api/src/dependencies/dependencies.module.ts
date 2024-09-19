import {Dependencies, Module} from '@nestjs/common';
import { DependenciesService } from './dependencies.service';
import { DependenciesController } from './dependencies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credential} from "../credentials/entities/credential.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dependencies])],
  controllers: [DependenciesController],
  providers: [DependenciesService],
})
export class DependenciesModule {}
