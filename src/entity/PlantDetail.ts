import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  InsertResult,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import PlantsDatabase from "./PlantsDatabase";

@Entity()
export default class PlantDetail extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "text" })
  contents!: string;

  @Column()
  type!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @OneToOne(
    (type) => PlantsDatabase,
    (plantsDatabase) => plantsDatabase.detail,
  )
  database!: PlantsDatabase;

  static insertPlantDetail(
    contents: string,
    type: string,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(PlantDetail)
      .values({ contents, type })
      .execute();
  }
}
