import {MigrationInterface, QueryRunner} from "typeorm";

export class blacklistTable1581600065324 implements MigrationInterface {
    name = 'blacklistTable1581600065324'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `blacklist` DROP FOREIGN KEY `FK_53c1ab62c3e5875bc3ac474823e`", undefined);
        await queryRunner.query("DROP INDEX `REL_53c1ab62c3e5875bc3ac474823` ON `blacklist`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL DEFAULT null", undefined);
        await queryRunner.query("ALTER TABLE `blacklist` ADD UNIQUE INDEX `IDX_491806708ff1601fd3ccb2e410` (`token`)", undefined);
        await queryRunner.query("ALTER TABLE `blacklist` ADD CONSTRAINT `FK_53c1ab62c3e5875bc3ac474823e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `blacklist` DROP FOREIGN KEY `FK_53c1ab62c3e5875bc3ac474823e`", undefined);
        await queryRunner.query("ALTER TABLE `blacklist` DROP INDEX `IDX_491806708ff1601fd3ccb2e410`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `banned` `banned` timestamp NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_53c1ab62c3e5875bc3ac474823` ON `blacklist` (`userId`)", undefined);
        await queryRunner.query("ALTER TABLE `blacklist` ADD CONSTRAINT `FK_53c1ab62c3e5875bc3ac474823e` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
