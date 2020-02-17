import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Plant from "./Plant";

@Entity()
export default class Family extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  familyName!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(
    (type) => Plant,
    (plant) => plant.family,
  )
  plants!: Plant[];

  // ? familyName 토대로 family찾음(커뮤니티 기능)
  static findByFamilyName(familyName: string): Promise<Family | undefined> {
    return this.createQueryBuilder("family")
      .where("family.familyName = :familyName", { familyName })
      .getOne();
  }

  // * familyName 찾거나 없으면 생성
  static async findOrCreateFamily(
    familyName: string,
  ): Promise<Family | undefined> {
    const findFamily = await this.findOne({ familyName });
    if (findFamily) {
      return findFamily;
    }

    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(Family)
        .values({ familyName })
        .execute()
    ).identifiers[0];

    return this.findOne({ id });
  }
}
