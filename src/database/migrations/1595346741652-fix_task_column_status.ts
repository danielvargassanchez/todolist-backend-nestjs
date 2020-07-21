import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTaskColumnStatus1595346741652 implements MigrationInterface {
    name = 'fixTaskColumnStatus1595346741652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" character varying(12) NOT NULL`);
    }

}
