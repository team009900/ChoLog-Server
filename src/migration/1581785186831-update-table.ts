/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTable1581785186831 implements MigrationInterface {
  name = "updateTable1581785186831";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "DROP INDEX `IDX_3a8677c0f33348a682293b5180` ON `plants_database`",
      undefined,
    );
    await queryRunner.query(
      "CREATE TABLE `plant_detail` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `contents` text NOT NULL, `type` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD `detailId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD UNIQUE INDEX `IDX_c272d2071b9c83ce8a695976b6` (`detailId`)",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` DROP FOREIGN KEY `FK_91db9716e0303017878f410ed0b`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` ADD UNIQUE INDEX `IDX_fcdf94d43d60ad4bb24f9f6ad6` (`image`)",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` CHANGE `plantDataId` `plantDataId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` DROP FOREIGN KEY `FK_ff8568e2c7ffb4f72f73b5a15a6`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD UNIQUE INDEX `IDX_850c8fc3c6581a7793af794ce8` (`scientificName`)",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` CHANGE `apiId` `apiId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `api` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` DROP FOREIGN KEY `FK_39448d16c354ed7b48779d18d5f`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `family` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_942507ae9b08270c884c5b7ac03`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` DROP FOREIGN KEY `FK_edfbd1ac35fb860823c2af31bac`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `parameter` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_89bc157b75a2d2d5b2956034ce4`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` CHANGE `parameterId` `parameterId` int UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_36011cbac81978f1d62a34ddcd1`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary` DROP FOREIGN KEY `FK_313fea908ef76b3ced62634223e`",
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
      "ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_9809abd2e5b51f8ccf358242873`",
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
      "ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL DEFAULT null",
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
      "ALTER TABLE `plant_parameter` CHANGE `plantId` `plantId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` CHANGE `parameterId` `parameterId` int UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "CREATE UNIQUE INDEX `REL_c272d2071b9c83ce8a695976b6` ON `plants_database` (`detailId`)",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` ADD CONSTRAINT `FK_91db9716e0303017878f410ed0b` FOREIGN KEY (`plantDataId`) REFERENCES `plants_database`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD CONSTRAINT `FK_c272d2071b9c83ce8a695976b60` FOREIGN KEY (`detailId`) REFERENCES `plant_detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
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
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_39448d16c354ed7b48779d18d5f` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE SET NULL ON UPDATE CASCADE",
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
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
      "ALTER TABLE `plant` DROP FOREIGN KEY `FK_39448d16c354ed7b48779d18d5f`",
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
      "ALTER TABLE `plants_database` DROP FOREIGN KEY `FK_c272d2071b9c83ce8a695976b60`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` DROP FOREIGN KEY `FK_91db9716e0303017878f410ed0b`",
      undefined,
    );
    await queryRunner.query(
      "DROP INDEX `REL_c272d2071b9c83ce8a695976b6` ON `plants_database`",
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
      "ALTER TABLE `diary_state` CHANGE `stateId` `stateId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` CHANGE `diaryId` `diaryId` int(10) UNSIGNED NOT NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL",
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
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_9809abd2e5b51f8ccf358242873` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
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
      "ALTER TABLE `diary` ADD CONSTRAINT `FK_313fea908ef76b3ced62634223e` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` ADD CONSTRAINT `FK_36011cbac81978f1d62a34ddcd1` FOREIGN KEY (`diaryId`) REFERENCES `diary`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` CHANGE `parameterId` `parameterId` int(10) UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `diary_state` ADD CONSTRAINT `FK_89bc157b75a2d2d5b2956034ce4` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `parameter` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `state` ADD CONSTRAINT `FK_edfbd1ac35fb860823c2af31bac` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_942507ae9b08270c884c5b7ac03` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `family` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant` ADD CONSTRAINT `FK_39448d16c354ed7b48779d18d5f` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE SET NULL ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `api` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` CHANGE `apiId` `apiId` int(10) UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` DROP INDEX `IDX_850c8fc3c6581a7793af794ce8`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` ADD CONSTRAINT `FK_ff8568e2c7ffb4f72f73b5a15a6` FOREIGN KEY (`apiId`) REFERENCES `api`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` CHANGE `plantDataId` `plantDataId` int(10) UNSIGNED NULL",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` DROP INDEX `IDX_fcdf94d43d60ad4bb24f9f6ad6`",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plant_data_img` ADD CONSTRAINT `FK_91db9716e0303017878f410ed0b` FOREIGN KEY (`plantDataId`) REFERENCES `plants_database`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
      undefined,
    );
    await queryRunner.query(
      "ALTER TABLE `plants_database` DROP INDEX `IDX_c272d2071b9c83ce8a695976b6`",
      undefined,
    );
    await queryRunner.query("ALTER TABLE `plants_database` DROP COLUMN `detailId`", undefined);
    await queryRunner.query("DROP TABLE `plant_detail`", undefined);
    await queryRunner.query(
      "CREATE UNIQUE INDEX `IDX_3a8677c0f33348a682293b5180` ON `plants_database` (`distributionName`)",
      undefined,
    );
  }
}
