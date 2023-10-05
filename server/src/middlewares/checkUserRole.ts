import { NextFunction, Request, Response } from "express";
import { PlatformUser } from "../types/types";
import boom from "@hapi/boom";

export const checkUserRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as PlatformUser;
        if (roles.includes(user.role)) {
            next();
        } else {
            next(
                boom.unauthorized(
                    "No tienes el rol necesario para ejecutar esta operación"
                )
            );
        }
    };
};
