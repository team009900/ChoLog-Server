import {MigrationInterface, QueryRunner} from "typeorm";

export class makeTables1581258219847 implements MigrationInterface {
    name = 'makeTables1581258219847'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `plant` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `mainImage` varchar(255) NULL, `nickname` varchar(255) NOT NULL, `plantName` varchar(255) NOT NULL, `scientificName` varchar(255) NULL, `adoptionDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `deathDate` timestamp NULL, `memo` text NULL, `advice` text NULL, `openAllow` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `familyId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `diary` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `image` varchar(255) NULL, `note` varchar(255) NULL, `degree` int NULL, `weatherName` varchar(255) NULL, `humidity` int NULL, `finedust` int NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `plantId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `friends` (`userId_1` int NOT NULL, `userId_2` int NOT NULL, INDEX `IDX_13fb33190c3333cbad7e5c8e75` (`userId_1`), INDEX `IDX_1867d7b94efcf02ed2c0bd183f` (`userId_2`), PRIMARY KEY (`userId_1`, `userId_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `plant_parameter` (`plantId` int UNSIGNED NOT NULL, `parameterId` int UNSIGNED NOT NULL, INDEX `IDX_9809abd2e5b51f8ccf35824287` (`plantId`), INDEX `IDX_942507ae9b08270c884c5b7ac0` (`parameterId`), PRIMARY KEY (`plantId`, `parameterId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `diary_state` (`diaryId` int UNSIGNED NOT NULL, `stateId` int UNSIGNED NOT NULL, INDEX `IDX_36011cbac81978f1d62a34ddcd` (`diaryId`), INDEX `IDX_89bc157b75a2d2d5b2956034ce` (`stateId`), PRIMARY KEY (`diaryId`, `stateId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` CHANGE `apiId` `apiId` int UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `api` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL DEFAULT null", undefined);
        await queryRunner.query("ALTER TABLE `family` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `state` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `state` CHANGE `parameterId` `parameterId` int UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` ADD CONSTRAINT `FK_ff8568e2c7ffb4f72f73b5a15a6` FOREIGN KEY (`apiId`) REFERENCES `api`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `state` ADD CONSTRAINT `FK_edfbd1ac35fb860823c2af31bac` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `plant` ADD CONSTRAINT `FK_ab082df81848f48f1d1f64a9cf8` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `plant` ADD CONSTRAINT `FK_39448d16c354ed7b48779d18d5f` FOREIGN KEY (`familyId`) REFERENCES `family`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `diary` ADD CONSTRAINT `FK_313fea908ef76b3ced62634223e` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friends` ADD CONSTRAINT `FK_13fb33190c3333cbad7e5c8e750` FOREIGN KEY (`userId_1`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `friends` ADD CONSTRAINT `FK_1867d7b94efcf02ed2c0bd183f5` FOREIGN KEY (`userId_2`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_9809abd2e5b51f8ccf358242873` FOREIGN KEY (`plantId`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `plant_parameter` ADD CONSTRAINT `FK_942507ae9b08270c884c5b7ac03` FOREIGN KEY (`parameterId`) REFERENCES `parameter`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `diary_state` ADD CONSTRAINT `FK_36011cbac81978f1d62a34ddcd1` FOREIGN KEY (`diaryId`) REFERENCES `diary`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `diary_state` ADD CONSTRAINT `FK_89bc157b75a2d2d5b2956034ce4` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_89bc157b75a2d2d5b2956034ce4`", undefined);
        await queryRunner.query("ALTER TABLE `diary_state` DROP FOREIGN KEY `FK_36011cbac81978f1d62a34ddcd1`", undefined);
        await queryRunner.query("ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_942507ae9b08270c884c5b7ac03`", undefined);
        await queryRunner.query("ALTER TABLE `plant_parameter` DROP FOREIGN KEY `FK_9809abd2e5b51f8ccf358242873`", undefined);
        await queryRunner.query("ALTER TABLE `friends` DROP FOREIGN KEY `FK_1867d7b94efcf02ed2c0bd183f5`", undefined);
        await queryRunner.query("ALTER TABLE `friends` DROP FOREIGN KEY `FK_13fb33190c3333cbad7e5c8e750`", undefined);
        await queryRunner.query("ALTER TABLE `diary` DROP FOREIGN KEY `FK_313fea908ef76b3ced62634223e`", undefined);
        await queryRunner.query("ALTER TABLE `plant` DROP FOREIGN KEY `FK_39448d16c354ed7b48779d18d5f`", undefined);
        await queryRunner.query("ALTER TABLE `plant` DROP FOREIGN KEY `FK_ab082df81848f48f1d1f64a9cf8`", undefined);
        await queryRunner.query("ALTER TABLE `state` DROP FOREIGN KEY `FK_edfbd1ac35fb860823c2af31bac`", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` DROP FOREIGN KEY `FK_ff8568e2c7ffb4f72f73b5a15a6`", undefined);
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `state` CHANGE `parameterId` `parameterId` int(10) UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `state` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `family` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL", undefined);
        await queryRunner.query("ALTER TABLE `api` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` CHANGE `apiId` `apiId` int(10) UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `plants_database` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("DROP INDEX `IDX_89bc157b75a2d2d5b2956034ce` ON `diary_state`", undefined);
        await queryRunner.query("DROP INDEX `IDX_36011cbac81978f1d62a34ddcd` ON `diary_state`", undefined);
        await queryRunner.query("DROP TABLE `diary_state`", undefined);
        await queryRunner.query("DROP INDEX `IDX_942507ae9b08270c884c5b7ac0` ON `plant_parameter`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9809abd2e5b51f8ccf35824287` ON `plant_parameter`", undefined);
        await queryRunner.query("DROP TABLE `plant_parameter`", undefined);
        await queryRunner.query("DROP INDEX `IDX_1867d7b94efcf02ed2c0bd183f` ON `friends`", undefined);
        await queryRunner.query("DROP INDEX `IDX_13fb33190c3333cbad7e5c8e75` ON `friends`", undefined);
        await queryRunner.query("DROP TABLE `friends`", undefined);
        await queryRunner.query("DROP TABLE `diary`", undefined);
        await queryRunner.query("DROP TABLE `plant`", undefined);
    }

}
