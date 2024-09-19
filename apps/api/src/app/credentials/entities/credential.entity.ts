import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Environment } from '../../environments/entities/environment.entity';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceType: string; // 'nexus', 'git', 'gerrit', etc.

  @Column()
  username: string;

  @Column()
  encryptedPassword: string;

  @ManyToOne(() => Environment, (environment) => environment.credentials)
  environment: Environment;
}
