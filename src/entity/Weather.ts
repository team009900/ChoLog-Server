import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Diary from "./Diary";

@Entity()
export default class Weather extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  name!: string;

  @Column()
  SKY!: number;

  @Column()
  PTY!: number;

  @Column({ nullable: true })
  T1H!: number;

  @Column({ nullable: true })
  REH!: number;

  @OneToMany(
    (type) => Diary,
    (diary) => diary.weather,
  )
  diaries!: Diary[];
}
