/* eslint-disable */
import { MigrationInterface, QueryRunner } from "typeorm";

export class changeParamColor1582444412519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "UPDATE `parameter` SET color = '#C7ADD7' WHERE color = '#CDCFC2'",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "UPDATE `parameter` SET color = '#CDCFC2' WHERE color = '#C7ADD7'",
      undefined,
    );
  }
}
