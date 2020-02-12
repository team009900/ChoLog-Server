import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import PlantsDatabase from "./PlantsDatabase";

@Entity()
export default class PlantDataImg extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  image!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => PlantsDatabase,
    (plantData) => plantData.images,
    { onDelete: "CASCADE", onUpdate: "CASCADE" },
  )
  plantData!: PlantsDatabase;
}
