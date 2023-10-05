import { Boom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

export const ormErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ValidationError) {
        return res.status(409).json({
            message: error.name,
            error: error.errors,
        });
    } else {
        next(error);
    }
};

export const boomErrorHandler = (
    error: Boom,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error.isBoom) {
        const { output } = error;
        return res.status(output.statusCode).json(output.payload);
    } else {
        next(error);
    }
};

export const generalErrorHandler = (
    error: Error,
    req: Request,
    res: Response
) => {
    if (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        });
    }
};
