import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { stateType } from "../@types/entity";
import { Parameter } from ".";

@Entity()
export default class State extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "tinyint" })
  level!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => Parameter,
    (parameter) => parameter.states,
    { onDelete: "CASCADE", onUpdate: "CASCADE" },
  )
  parameter!: Parameter;

  static async insertState(parameter: Parameter, level: number): Promise<State | undefined> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(State)
        .values({ level })
        .execute()
    ).identifiers[0];

    const findState = await this.findOne({ id });
    if (findState) {
      findState.parameter = parameter;
      findState.save();
    }
    return findState;
  }

  static async findOrCreate(parameterId: number, level: number): Promise<State | undefined> {
    const findParameter: Parameter | undefined = await Parameter.findOne({ id: parameterId });
    // console.log("---findParam", findParameter);

    if (findParameter === undefined) {
      return undefined;
    }

    const findState = await this.findOne({ parameter: findParameter });

    if (findState === undefined) {
      const newState = await this.insertState(findParameter, level);
      return newState;
    }

    findState.level = level;
    findState.parameter = findParameter;
    await findState.save();
    // console.log("findState.parameter", findState.parameter);
    return findState;
  }
}
