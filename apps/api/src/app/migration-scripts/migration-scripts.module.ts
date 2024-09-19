import { Module } from '@nestjs/common';
import { MigrationScriptsService } from './migration-scripts.service';
import { MigrationScriptsController } from './migration-scripts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MigrationScript} from "./entities/migration-script.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MigrationScript])],
  controllers: [MigrationScriptsController],
  providers: [MigrationScriptsService],
})
export class MigrationScriptsModule {}
