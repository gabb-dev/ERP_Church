import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    host: process.env.HOST_DB || "localhost",
    port: Number(process.env.PORT_DB) || 5432,
    username: process.env.USERNAME_DB || "postgres",
    password: process.env.PASSWORD_DB || "postgres",
    database: process.env.DATABASE || "erp_church",
    entities: [__dirname + "/../../modules/**/*.entity{.ts,.js}"],
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV !== "production",
    dropSchema: false,
    migrationsRun: false,
  };
};
