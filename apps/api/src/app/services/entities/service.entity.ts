import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Version} from '../../versions/entities/version.entity';
import {Configuration} from '../../configurations/entities/configuration.entity';
import {Dependency} from '../../dependencies/entities/dependency.entity';
import {ServiceVersion} from "./service-version.entity";
import { Environment } from '../../environments/entities/environment.entity';  // Import de l'entité Environment

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column()
  gitRepoUrl: string;

  @Column({nullable: true})
  gerritUrl: string;

  @Column()
  configDirectory: string;

  @Column()
  logDirectory: string;

  @Column()
  defaultLogLevel: string;

  @ManyToOne(() => Environment, (environment) => environment.services)  // Relation Many-to-One avec Environment
  environment: Environment;

  @OneToMany(() => Version, (version) => version.service)
  versions: Version[];

  @OneToMany(() => Configuration, (config) => config.service)
  configurations: Configuration[];

  @OneToMany(() => Dependency, (dependency) => dependency.service)
  dependencies: Dependency[];

  @OneToMany(() => ServiceVersion, (serviceVersion) => serviceVersion.service)
  serviceVersions: ServiceVersion[];
}
