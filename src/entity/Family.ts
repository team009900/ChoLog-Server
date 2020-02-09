import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Plant from "./Plant";

@Entity()
export default class Family extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  familyName!: string;

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
