import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from "typeorm";
import Parameter from "./Parameter";

@Entity()
export default class State extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "tinyint" })
  level!: number;

  @ManyToOne(
    (type) => Parameter,
    (parameter) => parameter.states,
  )
  parameter!: Parameter;
}
