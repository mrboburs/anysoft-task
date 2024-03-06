import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('task', function (table) {
        table.increments('id').primary();
        table.integer('order_id');
        table.string('title');
        table.string('description');
        table.enum('status',['todo', 'in_progress', 'test', 'done','cancelled']);
        table.timestamp('estimate');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
     
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('task');
}
