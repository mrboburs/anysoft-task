"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.string('description');
        table.enum('status', ["active", "inactive", "deleted"]);
        table.integer('estimate');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('orders');
}
exports.down = down;
//# sourceMappingURL=20240223113403_orders.js.map