import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Version} from "../../versions/entities/version.entity";

@Entity()
export class MigrationScript {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scriptName: string;

  @Column('text')
  scriptContent: string;

  @ManyToOne(() => Version, (version) => version.migrationScripts)
  version: Version;
}
