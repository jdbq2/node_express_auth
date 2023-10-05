import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";
import nodemailer from "nodemailer";
import "dotenv/config";
import { PlatformUser } from "../types/types";

const service = new UserServices();

const secret = process.env.JWT_SECRET!;

export class AuthServices {
    async getUser(email: string, password: string) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(
            password,
            user.dataValues.password
        );
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user.dataValues;
    }
    verifyToken(token: string) {
        return jwt.verify(token, secret);
    }
    signToken(user: PlatformUser) {
        const payload = {
            sub: user.id,
            role: user.role,
        };
        return jwt.sign(payload, secret);
    }
    async sendMail(email: string) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.badRequest();
        }

        const payload = { sub: user.dataValues.id };
        const token = jwt.sign(payload, secret, { expiresIn: "15min" });
        const recoveryLink = `http://localhost:3000/auth/recovery?token=${token}`;

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: "Postgress App",
            to: user.dataValues.email,
            subject: "Postgress App password recovery",
            html: `<b>Ingresa a este link para recuperar tu contraseña: <a href=${recoveryLink}>Link</a></b>`,
        });

        return { message: "mail sent" };
    }
    async changePassword(token: string, password: string) {
        try {
            const payload = jwt.verify(token, secret) as any;
            const user = await service.findOne(payload.sub);
            if (user) {
                const hash = await bcrypt.hash(password, 10);
                await service.update(user.dataValues.id, { password: hash });
                return { message: "Password Changed" };
            }
        } catch (error) {
            throw boom.unauthorized();
        }
    }
}
