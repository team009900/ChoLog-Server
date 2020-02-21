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
import { diaryType, diaryUpdateType } from "../@types/entity";
import Weather from "./Weather";

@Entity()
export default class Diary extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: true })
  image!: string;

  @Column({ nullable: true })
  note!: string;

  @Column({ nullable: true })
  temperature!: number;

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

  @ManyToOne(
    (type) => Weather,
    (weather) => weather.diaries,
    { onDelete: "SET NULL", onUpdate: "CASCADE" },
  )
  weather!: Weather;

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

  //* diary id로 diary 수정
  static async updateDiary(id: number, data: diaryUpdateType): Promise<Diary | undefined> {
    // const result = await this.update(data, { id });
    const result = await this.createQueryBuilder()
      .update(Diary)
      .set(data)
      .where("id = :id", { id })
      .execute();

    if (result.raw.affectedRows === 0) {
      return undefined;
    }

    return this.findOne({ id }, { relations: ["plant", "states", "states.parameter"] });
  }
}
