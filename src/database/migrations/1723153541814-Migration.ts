import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723153541814 implements MigrationInterface {
    name = 'Migration1723153541814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "watch" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "brand" character varying(255) NOT NULL, "referenceNumber" character varying(255) NOT NULL, CONSTRAINT "PK_fcd14254f9a60722c954c0174d0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "watch"`);
    }

}
