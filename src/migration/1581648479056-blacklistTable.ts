/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class blacklistTable1581648479056 implements MigrationInterface {
  name = "blacklistTable1581648479056";

  public async up(queryRunner: QueryRunner): Promise<any> {
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
  }
}
