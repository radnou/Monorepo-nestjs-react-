import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SnapshotServiceVersion } from './snapshot-service-version.entity';

@Entity()
export class EnvironmentSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  creationDate: Date;

  @Column()
  environment: string;

  @OneToMany(() => SnapshotServiceVersion, (ssv) => ssv.snapshot)
  serviceVersions: SnapshotServiceVersion[];

  @OneToMany(() => SnapshotServiceVersion, (ssv) => ssv.snapshot)
  snapshotServiceVersions: SnapshotServiceVersion[];
}
