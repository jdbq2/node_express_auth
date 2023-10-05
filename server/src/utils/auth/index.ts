import passport from "passport";

import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GoogleStrategy);
