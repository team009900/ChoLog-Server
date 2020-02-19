import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Plant from "./Plant";
import State from "./State";
import { diaryType } from "../@types/entity";

@Entity()
export default class Diary extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  note!: string;

  @Column({ nullable: true })
  degree!: number;

  @Column({ nullable: true })
  weatherName!: string;

  @Column({ nullable: true })
  humidity!: number;

  @Column({ nullable: true })
  finedust!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => Plant,
    (plant) => plant.diaries,
    { onDelete: "CASCADE", onUpdate: "CASCADE" },
  )
  plant!: Plant;

  @ManyToMany((type) => State)
  @JoinTable({ name: "diary_state" })
  states!: State[];

  //* diary id로 diary찾기
  static findById(id: number): Promise<Diary | undefined> {
    return this.createQueryBuilder("diary")
      .where("diary.id = :id", { id })
      .getOne();
  }

  //* diary 추가
  static async insertDiary(data: diaryType): Promise<Diary | undefined> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(Diary)
        .values(data)
        .execute()
    ).identifiers[0];
    // console.log(data);

    const findDiary = await this.findOne({ id }, { relations: ["states"] });
    if (findDiary && data.states) {
      findDiary.states = data.states;
      // findDiary.save();
    }

    return findDiary;
  }
}
