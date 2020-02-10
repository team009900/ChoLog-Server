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
}
