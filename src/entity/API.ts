import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  InsertResult,
} from "typeorm";
import PlantsDatabase from "./PlantsDatabase";

@Entity()
export default class API extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ unique: true })
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

  static async findOrCreate(provider: string, url: string): Promise<API | undefined> {
    const findOne = await this.findOne({ provider });
    if (findOne) {
      return undefined;
    }

    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(API)
        .values({ provider, url })
        .execute()
    ).identifiers[0];

    return this.findOne({ id });
  }
}
