import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  InsertResult,
} from "typeorm";
import PlantsDatabase from "./PlantsDatabase";

@Entity()
export default class PlantDataImg extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ unique: true })
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

  static async insertPlantImg(image: string): Promise<PlantDataImg | undefined> {
    //! 동일한 이미지가 있는지 확인
    const findImg = await this.findOne({ image });
    if (findImg) {
      return findImg;
    }

    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(PlantDataImg)
        .values({ image })
        .execute()
    ).identifiers[0];

    return this.findOne({ id });
  }
}
