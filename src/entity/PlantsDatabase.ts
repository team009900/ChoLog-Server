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
  JoinColumn,
  Like,
} from "typeorm";
import API from "./API";
import { plantsDatabaseType } from "../@types/entity";
import PlantDataImg from "./PlantDataImg";
import PlantDetail from "./PlantDetail";

@Entity()
export default class PlantsDatabase extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  distributionName!: string; // 유통명

  @Column({ nullable: true, unique: true })
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

  @OneToOne((type) => PlantDetail, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  detail!: PlantDetail;

  @ManyToOne(
    (type) => API,
    (api) => api.plantsDataList,
    { onDelete: "CASCADE", onUpdate: "CASCADE" },
  )
  api!: API;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  //* 검색
  static findPlantsDataList(target: string): Promise<PlantsDatabase[] | undefined> {
    return this.find({
      where: [
        { distributionName: Like(`%${target}%`) },
        { scientificName: Like(`%${target}%`) },
        { englishName: Like(`%${target}%`) },
      ],
      relations: ["images"],
      select: ["id", "distributionName", "scientificName", "englishName"],
    });
  }

  //* 데이터 입력
  static async insertPlantData(data: plantsDatabaseType): Promise<PlantsDatabase | undefined> {
    const { scientificName, contentsNo } = data;
    //! 동일한 contentsNo를 가진 식물data가 있는지 확인
    let findPlant = await this.findOne({ contentsNo });
    if (findPlant) {
      return findPlant;
    }

    if (scientificName) {
      //! 동일한 학명을 가진 식물data가 있는지 확인
      findPlant = await this.findOne({ scientificName });
      if (findPlant) {
        return findPlant;
      }
    }

    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(PlantsDatabase)
        .values(data)
        .execute()
    ).identifiers[0];

    return this.findOne({ id });
  }
}
