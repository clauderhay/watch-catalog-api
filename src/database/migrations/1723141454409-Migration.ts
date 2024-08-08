import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723141454409 implements MigrationInterface {
    name = 'Migration1723141454409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "watch" ADD CONSTRAINT "PK_fcd14254f9a60722c954c0174d0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "watch" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "watch" ADD "brand" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "watch" ADD "referenceNumber" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "watch" DROP COLUMN "referenceNumber"`);
        await queryRunner.query(`ALTER TABLE "watch" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "watch" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "watch" DROP CONSTRAINT "PK_fcd14254f9a60722c954c0174d0"`);
        await queryRunner.query(`ALTER TABLE "watch" DROP COLUMN "id"`);
    }

}
