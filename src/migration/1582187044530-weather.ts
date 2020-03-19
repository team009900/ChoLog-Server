/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class weather1582187044530 implements MigrationInterface {
  name = "weather1582187044530";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `weather` ADD `SKY` int NOT NULL", undefined);
    await queryRunner.query("ALTER TABLE `weather` ADD `PTY` int NOT NULL", undefined);
    await queryRunner.query("ALTER TABLE `weather` ADD `T1H` int NULL", undefined);
    await queryRunner.query("ALTER TABLE `weather` ADD `REH` int NULL", undefined);
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
    await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `REH`", undefined);
    await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `T1H`", undefined);
    await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `PTY`", undefined);
    await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `SKY`", undefined);
  }
}
