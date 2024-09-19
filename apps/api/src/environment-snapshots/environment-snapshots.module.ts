import {Module} from '@nestjs/common';
import {EnvironmentSnapshotsService} from './environment-snapshots.service';
import {EnvironmentSnapshotsController} from './environment-snapshots.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credential} from "../credentials/entities/credential.entity";
import {EnvironmentSnapshot} from "./entities/environment-snapshot.entity";
import {SnapshotServiceVersion} from "./entities/snapshot-service-version.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EnvironmentSnapshot,SnapshotServiceVersion],)],
  controllers: [EnvironmentSnapshotsController],
  providers: [EnvironmentSnapshotsService],
})
export class EnvironmentSnapshotsModule {
}
