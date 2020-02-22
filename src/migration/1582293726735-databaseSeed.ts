import { MigrationInterface, QueryRunner } from "typeorm";

export default class databaseSeed1582293726735 implements MigrationInterface {
  public up = async (queryRunner: QueryRunner): Promise<any> => {};

  public down = async (queryRunner: QueryRunner): Promise<any> => {
    await queryRunner.query("DELETE FROM `plants_database`", undefined);
    await queryRunner.query("DELETE FROM `api`", undefined);
  };
}
