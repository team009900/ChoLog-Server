import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  InsertResult,
  OneToMany,
} from "typeorm";
import API from "./API";
// import { plantsDatabase } from "../@types/entity";
import PlantDataImg from "./PlantDataImg";

@Entity()
export default class PlantsDatabase extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  distributionName!: string; // 유통명

  @Column()
  scientificName!: string; // 학명

  @Column()
  englishName!: string;

  @Column()
  contentsNo!: number;

  @OneToMany(
    (type) => PlantDataImg,
    (plantDataImg) => plantDataImg.plantData,
  )
  images!: PlantDataImg[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => API,
    (api) => api.plantsDataList,
    { onDelete: "CASCADE", onUpdate: "CASCADE" },
  )
  api!: API;

  //* 검색
  static findPlantsDataList(
    target: string,
  ): Promise<PlantsDatabase[] | undefined> {
    return this.createQueryBuilder("plants_database")
      .where(
        "distributionName = %:target% OR scientificName = %:target% OR englishName = %:target%",
        { target },
      )
      .getMany();
  }
}
