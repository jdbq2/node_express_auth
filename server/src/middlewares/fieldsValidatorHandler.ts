import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import boom from "@hapi/boom";
import { ValidRequestProperty } from "../types/types";

export const fieldsValidatorHandler = (
    schema: Schema,
    property: ValidRequestProperty
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        } else {
            next();
        }
    };
};
