import {Dependencies, Module} from '@nestjs/common';
import {DependenciesService} from './dependencies.service';
import {DependenciesController} from './dependencies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Service} from "../services/entities/service.entity";
import {Dependency} from "./entities/dependency.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Dependency, Service])],
  controllers: [DependenciesController],
  providers: [DependenciesService],
})
export class DependenciesModule {
}
