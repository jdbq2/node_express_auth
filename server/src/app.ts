import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import path from "path";
import {
    boomErrorHandler,
    generalErrorHandler,
    ormErrorHandler,
} from "./middlewares/errors";
import { authRouter } from "./routes/authentication.router";
import { usersRouter } from "./routes/user.router";
import "./utils/auth/index";

export const app = express();
app.use(helmet());
const allowedOrigins: string[] = [
    "http://localhost:3000",
    "http://localhost:5173",
];

const corsOptions: CorsOptions = {
    origin: (
        origin: string | undefined,
        callback: (error: Error | null, allow: boolean) => void
    ) => {
        if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Acceso no permitido por CORS"), false);
        }
    },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.get("/*", (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "..", "/public", "/index.html")
    );
});

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(generalErrorHandler);
