import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export default class createUsers1581082326857 implements MigrationInterface {
  public up = async (queryRunner: QueryRunner): Promise<any> => {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            unsigned: true, //! 더 많은 유저를 저장하기 위해
            isPrimary: true,
            isGenerated: true, //! auto increment
            generationStrategy: "increment", //! auto increment
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "snsId",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "provider",
            type: "varchar",
          },
          {
            name: "commentAllow", // 댓글 권한
            type: "tinyint",
            default: 1, // 0: 불가능, 1: 친구, 2: 전체
          },
          {
            name: "open",
            type: "tinyint",
            default: 1, // 0: 비공개, 1: 친구공개, 2: 전체공개
          },
          {
            name: "reports",
            type: "int",
            unsigned: true,
            default: 0,
          },
          {
            name: "banned",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "seed",
            type: "int",
            unsigned: true,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "NX_AUTHENTICATION",
        columnNames: ["email", "password", "snsId", "provider"],
      }),
    );
  };

  public down = async (queryRunner: QueryRunner): Promise<any> => {
    await queryRunner.dropTable("users");
  };
}
