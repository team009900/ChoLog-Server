/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class plantEntity1581931261511 implements MigrationInterface {
  name = "plantEntity1581931261511";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "DROP INDEX `IDX_c272d2071b9c83ce8a695976b6` ON `plants_database`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `mainImage` `image` varchar(255) NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL DEFAULT null",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `image` `mainImage` varchar(255) NULL",
      undefined,
    );
    await queryRunner.query(
      "CREATE UNIQUE INDEX `IDX_c272d2071b9c83ce8a695976b6` ON `plants_database` (`detailId`)",
      undefined,
    );
  }
}
