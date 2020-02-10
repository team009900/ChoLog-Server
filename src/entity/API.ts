import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
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

  @OneToMany(
    (type) => PlantsDatabase,
    (plantsDatabase) => plantsDatabase.api,
  )
  plantsDataList!: PlantsDatabase[];
}
