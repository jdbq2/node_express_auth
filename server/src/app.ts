import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { authenticationRouter } from "./routes/authentication.router";
import {
    boomErrorHandler,
    generalErrorHandler,
    ormErrorHandler,
} from "./middlewares/errors";

export const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/authentication", authenticationRouter);
app.get("/*", (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "..", "/public", "/index.html")
    );
});
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(generalErrorHandler);
