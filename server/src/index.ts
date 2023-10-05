import http from "http";
import { app } from "./app";
import "dotenv/config";
import { db } from "./db/config/dbConfig";

const server = http.createServer(app);

const startApp = async () => {
    try {
        await db.authenticate();
        console.log("DB Connected");
        await db.sync();
        console.log("DB Sync");
        server.listen(process.env.PORT, () => {
            console.log(`Listen on Port ${process.env.PORT}`);
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log("Something went wrong", error.message);
        }
    }
};

startApp();
