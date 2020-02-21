import { MigrationInterface, QueryRunner } from "typeorm";
import { API } from "../entity";
import { apiType } from "../@types/entity";
import runDatabaseSeed from "../seed/databaseSeed";

export default class databaseSeed1582293726735 implements MigrationInterface {
  public up = async (queryRunner: QueryRunner): Promise<any> => {
    await runDatabaseSeed();
  };

  public down = async (queryRunner: QueryRunner): Promise<any> => {
    await queryRunner.query("DELETE FROM `plants_database`", undefined);
    await queryRunner.query("DELETE FROM `api`", undefined);
  };
}
