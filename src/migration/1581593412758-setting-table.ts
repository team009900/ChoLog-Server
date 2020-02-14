/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class settingTable1581593412758 implements MigrationInterface {
  name = "settingTable1581593412758";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `plant_data_img` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `image` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `plantDataId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `plants_database` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `distributionName` varchar(255) NOT NULL, `scientificName` varchar(255) NULL, `englishName` varchar(255) NULL, `contentsNo` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `apiId` int UNSIGNED NULL, UNIQUE INDEX `IDX_3a8677c0f33348a682293b5180` (`distributionName`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `api` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `provider` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_ad869ec886ceea61cc24452eea` (`provider`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `family` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `familyName` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `parameter` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `parameterName` varchar(255) NOT NULL, `type` tinyint NOT NULL DEFAULT 0, `color` varchar(255) NOT NULL, `description` varchar(255) NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `state` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `level` tinyint NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `parameterId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `diary` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `image` varchar(255) NULL, `note` varchar(255) NULL, `degree` int NULL, `weatherName` varchar(255) NULL, `humidity` int NULL, `finedust` int NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `plantId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `plant` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `mainImage` varchar(255) NULL, `nickname` varchar(255) NOT NULL, `plantName` varchar(255) NOT NULL, `scientificName` varchar(255) NULL, `adoptionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `deathDate` timestamp NULL, `memo` text NULL, `advice` text NULL, `openAllow` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `familyId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `image` varchar(255) NULL, `snsId` varchar(255) NULL, `provider` varchar(255) NOT NULL DEFAULT 'local', `commentAllow` tinyint NOT NULL DEFAULT 1, `open` tinyint NOT NULL DEFAULT 1, `reports` int NOT NULL DEFAULT 0, `banned` timestamp NULL DEFAULT null, `seed` int NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_8434a0f43c344c75f5accc907b` (`snsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `blacklist` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `IDX_491806708ff1601fd3ccb2e410` (`token`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `diary_state` (`diaryId` int UNSIGNED NOT NULL, `stateId` int UNSIGNED NOT NULL, INDEX `IDX_36011cbac81978f1d62a34ddcd` (`diaryId`), INDEX `IDX_89bc157b75a2d2d5b2956034ce` (`stateId`), PRIMARY KEY (`diaryId`, `stateId`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `plant_parameter` (`plantId` int UNSIGNED NOT NULL, `parameterId` int UNSIGNED NOT NULL, INDEX `IDX_9809abd2e5b51f8ccf35824287` (`plantId`), INDEX `IDX_942507ae9b08270c884c5b7ac0` (`parameterId`), PRIMARY KEY (`plantId`, `parameterId`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `friends` (`userId_1` int NOT NULL, `userId_2` int NOT NULL, INDEX `IDX_13fb33190c3333cbad7e5c8e75` (`userId_1`), INDEX `IDX_1867d7b94efcf02ed2c0bd183f` (`userId_2`), PRIMARY KEY (`userId_1`, `userId_2`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` ADD CONSTRAINT `FK_91db9716e0303017878f410ed0b` FOREIGN KEY (`plantDataId`) REFERENCES `plants_database`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD CONSTRAINT `FK_ff8568e2c7ffb4f72f73b5a15a6` FOREIGN KEY (`apiId`) REFERENCES `api`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` ADD CONSTRAINT `FK_edfbd1ac35fb860823c2af31bac` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` ADD CONSTRAINT `FK_313fea908ef76b3ced62634223e` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_ab082df81848f48f1d1f64a9cf8` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_39448d16c354ed7b48779d18d5f` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE SET NULL ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `blacklist` ADD CONSTRAINT `FK_53c1ab62c3e5875bc3ac474823e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION",
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
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_9809abd2e5b51f8ccf358242873` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_942507ae9b08270c884c5b7ac03` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `friends` DROP FOREIGN KEY `FK_1867d7b94efcf02ed2c0bd183f5`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `friends` DROP FOREIGN KEY `FK_13fb33190c3333cbad7e5c8e750`",
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
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_89bc157b75a2d2d5b2956034ce4`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_36011cbac81978f1d62a34ddcd1`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `blacklist` DROP FOREIGN KEY `FK_53c1ab62c3e5875bc3ac474823e`",
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
      "ALTER TABLE `diary` DROP FOREIGN KEY `FK_313fea908ef76b3ced62634223e`",
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
      "ALTER TABLE `plant_data_img` DROP FOREIGN KEY `FK_91db9716e0303017878f410ed0b`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_1867d7b94efcf02ed2c0bd183f` ON `friends`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_13fb33190c3333cbad7e5c8e75` ON `friends`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `friends`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_942507ae9b08270c884c5b7ac0` ON `plant_parameter`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_9809abd2e5b51f8ccf35824287` ON `plant_parameter`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `plant_parameter`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_89bc157b75a2d2d5b2956034ce` ON `diary_state`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `IDX_36011cbac81978f1d62a34ddcd` ON `diary_state`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `diary_state`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_491806708ff1601fd3ccb2e410` ON `blacklist`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `blacklist`", undefined);
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
    await queryRunner.query("DROP TABLE `plant`", undefined);
    await queryRunner.query("DROP TABLE `diary`", undefined);
    await queryRunner.query("DROP TABLE `state`", undefined);
    await queryRunner.query("DROP TABLE `parameter`", undefined);
    await queryRunner.query("DROP TABLE `family`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_ad869ec886ceea61cc24452eea` ON `api`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `api`", undefined);
    await queryRunner.query(
      "DROP INDEX `IDX_3a8677c0f33348a682293b5180` ON `plants_database`",
      undefined,
    );
    await queryRunner.query("DROP TABLE `plants_database`", undefined);
    await queryRunner.query("DROP TABLE `plant_data_img`", undefined);
  }
}
