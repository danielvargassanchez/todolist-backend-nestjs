import {MigrationInterface, QueryRunner} from "typeorm";

export class fixStatusColumn1595271741280 implements MigrationInterface {
    name = 'fixStatusColumn1595271741280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(12) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    }

}
