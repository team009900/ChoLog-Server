import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import State from "./State";

@Entity()
export default class Parameter extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  parameterName!: string;

  @Column({ type: "tinyint", default: 0 })
  type!: number; // 0: on,off타입 / 1: 1,2,3타입

  @Column()
  color!: string;

  @Column()
  description!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @OneToMany(
    (type) => State,
    (state) => state.parameter,
  )
  states!: State[];

  //* parameterName으로 parameter찾기
  static findByName(parameterName: string): Promise<Parameter | undefined> {
    return this.createQueryBuilder("parameter")
      .where("parameter.parameterName = :parameterName", { parameterName })
      .getOne();
  }

  //* parameterName으로 parameter type찾기
  static async findTypeByName(
    parameterName: string,
  ): Promise<number | undefined> {
    const parameter: Parameter | undefined = await this.findByName(
      parameterName,
    );

    if (parameter === undefined) {
      return undefined;
    }
    return parameter.type;
  }
}
