import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Configuration } from '../../configurations/entities/configuration.entity';
import { Credential } from '../../credentials/entities/credential.entity';
import {Service} from "../../services/entities/service.entity";

@Entity()
export class Environment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 'dev', 'test', 'prod', etc.

  @OneToMany(() => Service, (service) => service.environment)  // Relation One-to-Many avec Service
  services: Service[];
  @OneToMany(() => Configuration, (config) => config.environment)
  configurations: Configuration[];

  @OneToMany(() => Credential, (credential) => credential.environment)
  credentials: Credential[];
}
