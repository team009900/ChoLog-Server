/* eslint-disable */
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import parameterSeed from "../seed/parameter.seed";

export class updateParameterSeed1582193697401 implements MigrationInterface {
  name = "updateParameterSeed1582193697401";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await getRepository("parameter").save(parameterSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
