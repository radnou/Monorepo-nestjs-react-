import {Module} from '@nestjs/common';
import {VersionsService} from './versions.service';
import {VersionsController} from './versions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Version} from "./entities/version.entity";
import {Service} from "../services/entities/service.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Version, Service],)],

  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {
}
