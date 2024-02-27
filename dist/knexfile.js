"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { DB_USER, DB_PASSWORD } = process.env;
const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + '/database/migrations',
        }
    }
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map