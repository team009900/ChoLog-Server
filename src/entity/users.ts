import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

@Entity()
export default class users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;
  //! 타입스크립트는 생성자에서 모든 속성을 선언해야 하는 strict class checking이 포함되어 있음.
  //! 그래서 username: string이라고만 하면
  //! 'no initializer and is not definitely assigned in the constructor'라는 에러가 뜸.
  //! 위 에러를 무시하려면 username!: string이라고 느낌표를 붙여서 사용하면 됨.

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  image!: string;

  @Column({ unique: true, nullable: true })
  snsId!: string;

  @Column()
  provider!: string;

  @Column({ type: "tinyint", default: 1 })
  commentAllow!: number; // (댓글) 2: 공개, 1: 친구공개, 0: 비공개

  @Column({ type: "tinyint", default: 1 })
  open!: number; // 2: 공개, 1: 친구공개, 0: 비공개

  @Column({ default: 0 })
  reports!: number; // 경고 횟수

  @Column({ default: null, nullable: true })
  banned!: Date; // Date까지 계정 정지

  @Column({ default: 0 })
  seed!: number; // 앱 내 재화

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: "CURRENT_TIMESTAMP",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: "CURRENT_TIMESTAMP",
  })
  public updatedAt!: Date;
}
