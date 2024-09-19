import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class Dependency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dependencyType: string; // 'technique', 'métier', etc.

  @ManyToOne(() => Service, (service) => service.dependencies)
  service: Service;

  @ManyToOne(() => Service)
  dependsOnService: Service;
}
