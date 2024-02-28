import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.string('description');
        table.enum('status',["active","inactive","deleted"]);
        table.integer('estimate');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('orders');
}

