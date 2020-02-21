/* eslint-disable */
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import weatherSeed from "../seed/weatherSeed";

export class weatherSeed1582195302838 implements MigrationInterface {
  name = "weatherSeed1582195302838";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await getRepository("weather").save(weatherSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DELETE FROM `weather`", undefined);
  }
}
