import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  InsertResult,
  OneToOne,
} from "typeorm";
import API from "./API";
import { plantsDatabaseType } from "../@types/entity";
import PlantDataImg from "./PlantDataImg";
import PlantDetail from "./PlantDetail";

@Entity()
export default class PlantsDatabase extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ unique: true })
  distributionName!: string; // 유통명

  @Column({ nullable: true })
  scientificName!: string; // 학명

  @Column({ nullable: true })
  englishName!: string;

  @Column()
  contentsNo!: number;

  @OneToMany(
    (type) => PlantDataImg,
    (plantDataImg) => plantDataImg.plantData,
    { nullable: true },
  )
  images!: PlantDataImg[];

  @OneToOne(
    (type) => PlantDetail,
    (plantDetail) => plantDetail.database,
  )
  detail!: PlantDetail;

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

  //* 데이터 입력
  static async insertPlantData(
    data: plantsDatabaseType,
  ): Promise<InsertResult | false> {
    //! 동일한 유통명을 가진 식물data가 있는지 확인
    const findPlants = await this.find({
      distributionName: data.distributionName,
    });
    if (findPlants.length !== 0) {
      return false;
    }

    return this.createQueryBuilder()
      .insert()
      .into(PlantsDatabase)
      .values(data)
      .execute();
  }
}
