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

  //* provider로 검색
  static findByProvider(provider: string): Promise<API | undefined> {
    return this.createQueryBuilder("api")
      .where("api.provider = :provider", { provider })
      .getOne();
  }

  static async insertAPI(
    provider: string,
    url: string,
  ): Promise<InsertResult | false> {
    const findOne = await this.findByProvider(provider);
    if (findOne) {
      return false;
    }

    return this.createQueryBuilder()
      .insert()
      .into(API)
      .values({ provider, url })
      .execute();
  }
}
