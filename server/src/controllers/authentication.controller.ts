import { NextFunction, Request, Response } from "express";
import { PlatformUser } from "../types/types";
import { AuthServices } from "../services/authentication.service";

const service = new AuthServices();

export const googleLoginController = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (req.user) {
            const user = req.user as PlatformUser;
            const token = service.signToken(user);
            const htmlResponse = `
            <html>
              <script>
                // Save JWT to localStorage
                window.localStorage.setItem('JWT', '${token}');
                window.localStorage.setItem('USER', '${JSON.stringify(user)}');
                // Redirect browser to root of application
                window.location.href = '/';
              </script>
            </html>
            `;
            return res.status(200).send(htmlResponse);
        } else {
            return res.status(500).json({
                message: "No user",
            });
        }
    } catch (error) {
        next(error);
    }
};

export const localAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as PlatformUser;
        if (user) {
            const token = service.signToken(user);
            return res.status(200).json({
                user,
                token,
            });
        }
    } catch (error) {
        next(error);
    }
};
export const passwordRecovery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;
        const rta = await service.sendMail(email);
        res.status(200).json(rta);
    } catch (error) {
        next(error);
    }
};
export const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token, password } = req.body;
        const rta = await service.changePassword(token, password);
        res.status(200).json(rta);
    } catch (error) {
        next(error);
    }
};
