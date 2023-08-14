import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user_id",
        passwordField: "password",
        passReqToCallback: false,
      },
      async (user_id, password, done) => {
        try {
          const exUser = await User.findOne({ where: { user_id } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
