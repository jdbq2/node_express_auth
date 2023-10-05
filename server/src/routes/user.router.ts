import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users.controller";
import { fieldsValidatorHandler } from "../middlewares/fieldsValidatorHandler";
import { createUserSchema } from "../schemas/user.schema";
import passport from "passport";
import { checkUserRole } from "../middlewares/checkUserRole";

export const usersRouter = Router();

usersRouter.post(
    "/",
    fieldsValidatorHandler(createUserSchema, "body"),
    passport.authenticate("jwt", { session: false }),
    checkUserRole(["admin"]),
    createUser
);
usersRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    getAllUsers
);
