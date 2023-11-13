import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user";
import bcrypt from "bcrypt";

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          console.log("locastrategy 첫줄");
          const exUser: User | null = await User.findOne({
            where: { user_id: id },
          });
          console.log("exUser타입 재설정해라", exUser);
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              const userData = {
                user: exUser,
              };
              done(null, userData);
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
