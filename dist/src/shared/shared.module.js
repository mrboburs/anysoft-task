"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nestjs_knex_1 = require("nestjs-knex");
let SharedModule = class SharedModule {
    constructor(knex) {
        this.knex = knex;
        this.get();
    }
    get() {
        return this.knex('orders').select();
        console.log("success connection");
    }
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_knex_1.KnexModule.forRootAsync({
                useFactory: () => ({
                    config: {
                        client: "pg",
                        useNullAsDefault: true,
                        connection: {
                            host: 'localhost',
                            user: 'postgres',
                            port: "5434",
                            password: '123',
                            database: 'nest',
                        },
                    },
                }),
            }),
        ]
    }),
    __param(0, (0, nestjs_knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], SharedModule);
//# sourceMappingURL=shared.module.js.map