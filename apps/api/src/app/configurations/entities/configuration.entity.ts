import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { Environment } from '../../environments/entities/environment.entity';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column('text')
  value: string;

  @ManyToOne(() => Service, (service) => service.configurations)
  service: Service;

  @ManyToOne(() => Environment, (environment) => environment.configurations)
  environment: Environment;
}
