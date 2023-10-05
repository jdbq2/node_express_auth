import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";

export const JwtStrategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
        return done(null, payload);
    }
);
