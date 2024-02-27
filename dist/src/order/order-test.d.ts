import { Knex } from "knex";
export declare class OrderTest {
    private readonly knex;
    constructor(knex: Knex);
    findOneOrder(param: any): Promise<any[]>;
}
