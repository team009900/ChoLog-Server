import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Diary from "./Diary";

@Entity()
export default class Weather extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    (type) => Diary,
    (diary) => diary.weather,
  )
  diaries!: Diary[];
}
