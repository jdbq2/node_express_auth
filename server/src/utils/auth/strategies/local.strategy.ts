import { Strategy } from "passport-local";
import { PlatformUser } from "../../../types/types";
import { AuthServices } from "../../../services/authentication.service";

const service = new AuthServices();

export const LocalStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (
        email: string,
        password: string,
        done: (
            error?: Error | null,
            user?: PlatformUser | undefined | boolean
        ) => void
    ) => {
        try {
            const user = await service.getUser(email, password);
            done(null, user);
        } catch (error: any) {
            done(error, false);
        }
    }
);
