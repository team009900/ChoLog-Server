import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import PlantsDatabase from "./PlantsDatabase";

@Entity()
export default class API extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  provider!: string;

  @Column()
  url!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(
    (type) => PlantsDatabase,
    (plantsDatabase) => plantsDatabase.api,
  )
  plantsDataList!: PlantsDatabase[];
}
