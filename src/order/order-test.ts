import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";

export class OrderTest {
    constructor(@InjectKnex() private readonly knex: Knex) {

    }

    async findOneOrder(param: any) {
        return this.knex('orders').where(param).select('*');
    }
}