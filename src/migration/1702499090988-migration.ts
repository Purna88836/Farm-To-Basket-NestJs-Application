import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702499090988 implements MigrationInterface {
    name = 'Migration1702499090988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profiles" ALTER COLUMN "is_farmer" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Reviews" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Profiles" ALTER COLUMN "is_farmer" DROP DEFAULT`);
    }

}
