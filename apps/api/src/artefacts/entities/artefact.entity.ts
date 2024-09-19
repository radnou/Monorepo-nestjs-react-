import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Version } from '../../versions/entities/version.entity';

@Entity()
export class Artefact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'rpm', 'container', etc.

  @Column()
  nexusUrl: string;

  @ManyToOne(() => Version, (version) => version.artefacts)
  version: Version;
}
