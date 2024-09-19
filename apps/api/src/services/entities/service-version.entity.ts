import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Service } from './service.entity';
import { Version } from '../../versions/entities/version.entity';
import { SnapshotServiceVersion } from '../../environment-snapshots/entities/snapshot-service-version.entity';

@Entity()
export class ServiceVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceVersions)
  service: Service;

  @ManyToOne(() => Version, (version) => version.serviceVersions)
  version: Version;

  @OneToMany(() => SnapshotServiceVersion, (ssv) => ssv.serviceVersion)
  snapshotServiceVersions: SnapshotServiceVersion[];
}
