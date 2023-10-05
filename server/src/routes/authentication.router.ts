import { Router } from "express";
import {
    changePassword,
    googleLoginController,
    localAuth,
    passwordRecovery,
} from "../controllers/authentication.controller";
import passport from "passport";

export const authRouter = Router();

authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
    }),
    googleLoginController
);

authRouter.get(
    "/local",
    passport.authenticate("local", { session: false }),
    localAuth
);
authRouter.post("/recovery", passwordRecovery);
authRouter.post("/change-password", changePassword);
