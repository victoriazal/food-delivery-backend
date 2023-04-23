import { MigrationInterface, QueryRunner } from "typeorm";

export class foodDelivery1682285408039 implements MigrationInterface {
    name = 'foodDelivery1682285408039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Order" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "userId" integer, "dishId" integer, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_3f58bde57959264899a0c7058a1" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_3f58bde57959264899a0c7058a1"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`DROP TABLE "Order"`);
    }

}
