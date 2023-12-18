import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702376896686 implements MigrationInterface {
    name = 'Migration1702376896686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profiles" ALTER COLUMN "is_farmer" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profiles" ALTER COLUMN "is_farmer" DROP DEFAULT`);
    }

}
