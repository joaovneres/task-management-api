import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1721097083756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                username varchar(256) NOT NULL,
                password_hash varchar(256) NOT NULL,
                CONSTRAINT user_pk PRIMARY KEY (id),
                CONSTRAINT user_username_unique UNIQUE (username)
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }

}
