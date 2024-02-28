import { Module } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex, KnexModule } from "nestjs-knex";

@Module({
    imports: [
        KnexModule.forRootAsync({
            useFactory: () => ({
                config: {
                    client: "pg",
                    useNullAsDefault: true,
                    connection: {
                        host: 'localhost',
                        user: 'postgres',
                        port:"5434",
                        password: '123',
                        database: 'nest',
                    },
                },
            }),
        }),
    ]
})
export class SharedModule {
    constructor(@InjectKnex() private readonly knex: Knex) {
        this.get()
    }

    get() {
        return this.knex('orders').select();
        console.log("success connection");
        
    }
}