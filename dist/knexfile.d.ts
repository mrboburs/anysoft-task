import "dotenv/config";
declare const config: {
    development: {
        client: string;
        connection: {
            host: string;
            user: string;
            port: string;
            password: string;
            database: string;
        };
        migrations: {
            directory: string;
        };
    };
};
export default config;
