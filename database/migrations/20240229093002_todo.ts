import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.integer('order_id');
        table.string('title');
        table.string('description');
        table.enum('status',["active","inactive","deleted"]);
        table.integer('estimate');
        table.timestamp('created_at').defaultTo(knex.fn.now());
     
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tasks');
}

