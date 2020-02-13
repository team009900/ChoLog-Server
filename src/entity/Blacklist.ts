import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity()
export default class Blacklist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  token!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  public updatedAt!: Date;

  @ManyToOne(
    (type) => User,
    (user) => user.blacklist,
  )
  user!: User;

  static findByToken(token: string): Promise<Blacklist | undefined> {
    return this.createQueryBuilder("blacklist")
      .where("blacklist.token = :token", { token })
      .getOne();
  }
}
