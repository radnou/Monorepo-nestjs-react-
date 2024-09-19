import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VersionsModule} from "./versions/versions.module";
import {ServicesModule} from "./services/services.module";
import {ArtefactsModule} from "./artefacts/artefacts.module";
import {MigrationScriptsModule} from "./migration-scripts/migration-scripts.module";
import {ConfigurationsModule} from "./configurations/configurations.module";
import {DependenciesModule} from "./dependencies/dependencies.module";
import {CredentialsModule} from "./credentials/credentials.module";
import {EnvironmentSnapshotsModule} from "./environment-snapshots/environment-snapshots.module";
import {EnvironmentsModule} from "./environments/environments.module";
import { join } from 'path';
import {Service} from "./services/entities/service.entity";
import {Version} from "./versions/entities/version.entity";
import {Configuration} from "./configurations/entities/configuration.entity";
import {Artefact} from "./artefacts/entities/artefact.entity";
import {Credential} from "./credentials/entities/credential.entity";
import {Dependency} from "./dependencies/entities/dependency.entity";
import {EnvironmentSnapshot} from "./environment-snapshots/entities/environment-snapshot.entity";
import {SnapshotServiceVersion} from "./environment-snapshots/entities/snapshot-service-version.entity";
import {Environment} from "./environments/entities/environment.entity";
import {MigrationScript} from "./migration-scripts/entities/migration-script.entity";
import {ServiceVersion} from "./services/entities/service-version.entity";
import {glob} from "nx/src/generators/utils/glob";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'data', 'database.db'),
     entities: [Service,Version,Configuration,Artefact,Credential,Dependency,EnvironmentSnapshot,SnapshotServiceVersion,Environment,MigrationScript,ServiceVersion],
      logging: true, // pour le débogage
      synchronize: true, // Ne pas utiliser en production, synchronise les entites et bdd
    }),
    ServicesModule,
    VersionsModule,
    ArtefactsModule,
    MigrationScriptsModule,
    ConfigurationsModule,
    DependenciesModule,
    CredentialsModule,
    EnvironmentsModule,    EnvironmentSnapshotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
