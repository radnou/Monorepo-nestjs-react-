import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Service} from '../../services/entities/service.entity';
import {Artefact} from '../../artefacts/entities/artefact.entity';
import {MigrationScript} from '../../migration-scripts/entities/migration-script.entity';
import {ServiceVersion} from "../../services/entities/service-version.entity";

@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  versionNumber: string;

  @Column()
  commitHash: string;

  @Column({type: 'date', nullable: true})
  releaseDate: Date;

  @ManyToOne(() => Service, (service) => service.versions)
  service: Service;

  @OneToMany(() => Artefact, (artefact) => artefact.version)
  artefacts: Artefact[];

  @OneToMany(() => MigrationScript, (script) => script.version)
  migrationScripts: MigrationScript[];

  @OneToMany(() => ServiceVersion, (serviceVersion) => serviceVersion.version)
  serviceVersions: ServiceVersion[];
}
