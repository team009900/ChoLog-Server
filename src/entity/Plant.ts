import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import Family from "./Family";
import Diary from "./Diary";

@Entity()
export default class Plant extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: true })
  mainImage!: string;

  @Column()
  nickname!: string;

  @Column()
  plantName!: string;

  @Column({ nullable: true })
  scientificName!: string;

  @Column({ type: "timestamp" })
  adoptionDate!: Date;

  @Column({ type: "timestamp", nullable: true })
  deathDate!: Date;

  @Column({ type: "text", nullable: true })
  memo!: string;

  @Column({ type: "text", nullable: true })
  advice!: string;

  @Column({ type: "tinyint", default: 1 })
  openAllow!: number; // 0: 비공개, 1: 친구공개, 2: 전체공개

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => User,
    (user) => user.plants,
  )
  user!: User;

  @ManyToOne(
    (type) => Family,
    (family) => family.plants,
  )
  family!: Family;

  @OneToMany(
    (type) => Diary,
    (diary) => diary.plant,
  )
  diaries!: Diary[];

  //* plant id로 Plant찾기
  static findById(id: number): Promise<Plant | undefined> {
    return this.createQueryBuilder("plant")
      .where("plant.id = :id", { id })
      .getOne();
  }
}
