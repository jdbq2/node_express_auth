import { Strategy, VerifyCallback } from "passport-google-oauth20";
import "dotenv/config";

export const GoogleStrategy = new Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/api/auth/google/callback",
    },
    (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ) => {
        done(null, profile);
    }
);
