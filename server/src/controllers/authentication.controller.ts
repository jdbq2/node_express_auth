import { NextFunction, Request, Response } from "express";
import { AuthenticationServices } from "../services/authentication.service";

const service = new AuthenticationServices();

export const login = (req: Request, res: Response, next: NextFunction) => {};
