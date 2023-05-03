import { MigrationInterface, QueryRunner } from "typeorm";

export class FoodDelivery1683113409740 implements MigrationInterface {
    name = 'FoodDelivery1683113409740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Order" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "userId" integer, "dishId" integer, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Dish" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "shortDescription" character varying NOT NULL, "about" character varying NOT NULL, "rating" character varying NOT NULL, "time" character varying NOT NULL, "price" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_31c5f0273aab6783d1a6ebdfa50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FavoriteDishes" ("id" SERIAL NOT NULL, "userId" integer, "dishId" integer, CONSTRAINT "PK_1ae31a1fb8ca63ee916d372e105" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Courier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "profession" character varying NOT NULL, "image" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_33a7542c240e1deb83a473b6e7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_3f58bde57959264899a0c7058a1" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FavoriteDishes" ADD CONSTRAINT "FK_95fc44b58ced611706332f054b1" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "FavoriteDishes" ADD CONSTRAINT "FK_c98730bc285c19c7031822e5a32" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FavoriteDishes" DROP CONSTRAINT "FK_c98730bc285c19c7031822e5a32"`);
        await queryRunner.query(`ALTER TABLE "FavoriteDishes" DROP CONSTRAINT "FK_95fc44b58ced611706332f054b1"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_3f58bde57959264899a0c7058a1"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`DROP TABLE "Courier"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "FavoriteDishes"`);
        await queryRunner.query(`DROP TABLE "Dish"`);
        await queryRunner.query(`DROP TABLE "Order"`);
    }

}