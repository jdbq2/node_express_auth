import { Router } from "express";
import { login } from "../controllers/authentication.controller";

export const authenticationRouter = Router();

authenticationRouter.get("/login", login);
