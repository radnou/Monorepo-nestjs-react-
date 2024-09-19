import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Configuration } from '../../configurations/entities/configuration.entity';
import { Credential } from '../../credentials/entities/credential.entity';

@Entity()
export class Environment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 'dev', 'test', 'prod', etc.

  @OneToMany(() => Configuration, (config) => config.environment)
  configurations: Configuration[];

  @OneToMany(() => Credential, (credential) => credential.environment)
  credentials: Credential[];
}
