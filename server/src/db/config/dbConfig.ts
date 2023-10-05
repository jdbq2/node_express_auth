import { Sequelize } from "sequelize";
import { setupModels } from "../models";

export const db = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
    }
);

setupModels(db);
