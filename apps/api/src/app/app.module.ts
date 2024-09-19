import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VersionsModule} from "../versions/versions.module";
import {ServicesModule} from "../services/services.module";
import {ArtefactsModule} from "../artefacts/artefacts.module";
import {MigrationScriptsModule} from "../migration-scripts/migration-scripts.module";
import {ConfigurationsModule} from "../configurations/configurations.module";
import {DependenciesModule} from "../dependencies/dependencies.module";
import {CredentialsModule} from "../credentials/credentials.module";
import {EnvironmentSnapshotsModule} from "../environment-snapshots/environment-snapshots.module";
import {EnvironmentsModule} from "../environments/environments.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Ne pas utiliser en production, synchronise entite et bdd
    }),
    ServicesModule,
    VersionsModule,
    ArtefactsModule,
    MigrationScriptsModule,
    ConfigurationsModule,
    DependenciesModule,
    CredentialsModule,
    EnvironmentsModule,
    EnvironmentSnapshotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
