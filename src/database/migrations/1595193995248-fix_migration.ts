import {MigrationInterface, QueryRunner} from "typeorm";

export class fixMigration1595193995248 implements MigrationInterface {
    name = 'fixMigration1595193995248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "pasword" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "pasword"`);
    }

}
