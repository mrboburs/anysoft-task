import { Knex } from "knex";
export declare class SharedModule {
    private readonly knex;
    constructor(knex: Knex);
    get(): Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
}
