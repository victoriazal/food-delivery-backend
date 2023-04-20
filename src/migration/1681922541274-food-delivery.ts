import { MigrationInterface, QueryRunner } from "typeorm";

export class foodDelivery1681922541274 implements MigrationInterface {
    name = 'foodDelivery1681922541274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Dish" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "shortDescription" character varying NOT NULL, "about" character varying NOT NULL, "rating" character varying NOT NULL, "time" character varying NOT NULL, "price" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_31c5f0273aab6783d1a6ebdfa50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Courier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "profession" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_33a7542c240e1deb83a473b6e7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Courier"`);
        await queryRunner.query(`DROP TABLE "Dish"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
