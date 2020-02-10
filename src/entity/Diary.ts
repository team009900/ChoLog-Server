import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import Plant from "./Plant";
import State from "./State";

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

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @ManyToOne(
    (type) => Plant,
    (plant) => plant.diaries,
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
}
