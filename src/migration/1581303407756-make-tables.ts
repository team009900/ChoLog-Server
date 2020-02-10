/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class makeTables1581303407756 implements MigrationInterface {
  name = "makeTables1581303407756";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `plants_database` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `distributionName` varchar(255) NOT NULL, `scientificName` varchar(255) NOT NULL, `englishName` varchar(255) NOT NULL, `detailImg` varchar(255) NOT NULL, `contentsNo` int NOT NULL, `apiId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `api` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `provider` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `image` varchar(255) NULL, `snsId` varchar(255) NULL, `provider` varchar(255) NOT NULL, `commentAllow` tinyint NOT NULL DEFAULT 1, `open` tinyint NOT NULL DEFAULT 1, `reports` int NOT NULL DEFAULT 0, `banned` timestamp NULL DEFAULT null, `seed` int NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_8434a0f43c344c75f5accc907b` (`snsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `family` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `familyName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `state` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `level` tinyint NOT NULL, `parameterId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `parameter` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `parameterName` varchar(255) NOT NULL, `type` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `familyId` `familyId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` CHANGE `plantId` `plantId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` CHANGE `plantId` `plantId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` CHANGE `parameterId` `parameterId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` CHANGE `diaryId` `diaryId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` CHANGE `stateId` `stateId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD CONSTRAINT `FK_ff8568e2c7ffb4f72f73b5a15a6` FOREIGN KEY (`apiId`) REFERENCES `api`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` ADD CONSTRAINT `FK_edfbd1ac35fb860823c2af31bac` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_ab082df81848f48f1d1f64a9cf8` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_39448d16c354ed7b48779d18d5f` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` ADD CONSTRAINT `FK_313fea908ef76b3ced62634223e` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `friends` ADD CONSTRAINT `FK_13fb33190c3333cbad7e5c8e750` FOREIGN KEY (`userId_1`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `friends` ADD CONSTRAINT `FK_1867d7b94efcf02ed2c0bd183f5` FOREIGN KEY (`userId_2`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_9809abd2e5b51f8ccf358242873` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_942507ae9b08270c884c5b7ac03` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` ADD CONSTRAINT `FK_36011cbac81978f1d62a34ddcd1` FOREIGN KEY (`diaryId`) REFERENCES `diary`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` ADD CONSTRAINT `FK_89bc157b75a2d2d5b2956034ce4` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_89bc157b75a2d2d5b2956034ce4`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_36011cbac81978f1d62a34ddcd1`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_942507ae9b08270c884c5b7ac03`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_9809abd2e5b51f8ccf358242873`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `friends` DROP FOREIGN KEY `FK_1867d7b94efcf02ed2c0bd183f5`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `friends` DROP FOREIGN KEY `FK_13fb33190c3333cbad7e5c8e750`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` DROP FOREIGN KEY `FK_313fea908ef76b3ced62634223e`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` DROP FOREIGN KEY `FK_39448d16c354ed7b48779d18d5f`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` DROP FOREIGN KEY `FK_ab082df81848f48f1d1f64a9cf8`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` DROP FOREIGN KEY `FK_edfbd1ac35fb860823c2af31bac`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` DROP FOREIGN KEY `FK_ff8568e2c7ffb4f72f73b5a15a6`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` CHANGE `stateId` `stateId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` CHANGE `diaryId` `diaryId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` CHANGE `parameterId` `parameterId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` CHANGE `plantId` `plantId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` CHANGE `plantId` `plantId` int(10) UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `familyId` `familyId` int(10) UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query("DROP TABLE `parameter`", undefined);
    await queryRunner.query("DROP TABLE `state`", undefined);
    await queryRunner.query("DROP TABLE `family`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_8434a0f43c344c75f5accc907b` ON `user`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `user`", undefined);
    await queryRunner.query("DROP TABLE `api`", undefined);
    await queryRunner.query("DROP TABLE `plants_database`", undefined);
  }
}
