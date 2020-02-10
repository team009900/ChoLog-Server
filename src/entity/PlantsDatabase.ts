import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import API from "./API";

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
  detailImg!: string;

  @Column()
  contentsNo!: number;

  @ManyToOne(
    (type) => API,
    (api) => api.plantsDataList,
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
