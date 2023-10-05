import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user.service";
import { PlatformUser } from "../types/types";

const service = new UserServices();

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body: PlatformUser = req.body;
        const newUser = await service.create(body);
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await service.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
