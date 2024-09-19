import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EnvironmentSnapshot } from './environment-snapshot.entity';
import { ServiceVersion } from '../../services/entities/service-version.entity';

@Entity()
export class SnapshotServiceVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EnvironmentSnapshot, (snapshot) => snapshot.snapshotServiceVersions)
  snapshot: EnvironmentSnapshot;

  @ManyToOne(() => ServiceVersion, (serviceVersion) => serviceVersion.snapshotServiceVersions)
  serviceVersion: ServiceVersion;
}
