import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1702347547945 implements MigrationInterface {
    name = 'Migration1702347547945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Profiles" ("id" SERIAL NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "is_farmer" boolean NOT NULL, "fullname" text NOT NULL, "mail" text NOT NULL, "phone_number" text NOT NULL, "location" text NOT NULL, CONSTRAINT "PK_1cafb33ec125c423acbde2be7a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Products_category_enum" AS ENUM('fruits', 'vegetables', 'dairy products', 'grains')`);
        await queryRunner.query(`CREATE TABLE "Products" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "image" text DEFAULT 'media/', "category" "public"."Products_category_enum" NOT NULL, "farmer" integer, CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Reviews" ("id" SERIAL NOT NULL, "content" text NOT NULL, "created_at" date NOT NULL, "rating" integer NOT NULL, "product" integer, "profile" integer, CONSTRAINT "PK_5ae106da7bc18dc3731e48a8a94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Notifications" ("id" SERIAL NOT NULL, "message" text NOT NULL, "created_at" date NOT NULL, "product" integer, "profile" integer, CONSTRAINT "PK_c77268afe7d3c5568da66c5bebe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CartItems" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "is_ordered" boolean NOT NULL, "product" integer, "profile" integer, CONSTRAINT "PK_3bd084e7aaedba88bd7a0973561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_9793ef3b247d3a6ffcab5b9d655" FOREIGN KEY ("farmer") REFERENCES "Profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_23892ea9ed9306e7398f04f9be6" FOREIGN KEY ("product") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_f81a4272dddba5fbeb0233ff19d" FOREIGN KEY ("profile") REFERENCES "Profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notifications" ADD CONSTRAINT "FK_08c81cb1251cf184385a600b58a" FOREIGN KEY ("product") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notifications" ADD CONSTRAINT "FK_fb6a6fddb309772629bed175ee0" FOREIGN KEY ("profile") REFERENCES "Profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CartItems" ADD CONSTRAINT "FK_edf5b0528cf02a5e0f162be3ae7" FOREIGN KEY ("product") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CartItems" ADD CONSTRAINT "FK_8af049efce180d735d5fcbe9053" FOREIGN KEY ("profile") REFERENCES "Profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CartItems" DROP CONSTRAINT "FK_8af049efce180d735d5fcbe9053"`);
        await queryRunner.query(`ALTER TABLE "CartItems" DROP CONSTRAINT "FK_edf5b0528cf02a5e0f162be3ae7"`);
        await queryRunner.query(`ALTER TABLE "Notifications" DROP CONSTRAINT "FK_fb6a6fddb309772629bed175ee0"`);
        await queryRunner.query(`ALTER TABLE "Notifications" DROP CONSTRAINT "FK_08c81cb1251cf184385a600b58a"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_f81a4272dddba5fbeb0233ff19d"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_23892ea9ed9306e7398f04f9be6"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_9793ef3b247d3a6ffcab5b9d655"`);
        await queryRunner.query(`DROP TABLE "CartItems"`);
        await queryRunner.query(`DROP TABLE "Notifications"`);
        await queryRunner.query(`DROP TABLE "Reviews"`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP TYPE "public"."Products_category_enum"`);
        await queryRunner.query(`DROP TABLE "Profiles"`);
    }

}
