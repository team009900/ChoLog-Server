import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
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

  static async findOrCreate(contents: string, type: string): Promise<PlantDetail | undefined> {
    const findPlant = await this.findOne({ contents });
    if (findPlant) {
      return findPlant;
    }

    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(PlantDetail)
        .values({ contents, type })
        .execute()
    ).identifiers[0];

    return this.findOne({ id });
  }
}
