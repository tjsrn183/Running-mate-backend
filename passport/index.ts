import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import User from "../models/user";

export default () => {
  passport.serializeUser((data: any, done) => {
    done(null, { id: data.user.id, accessToken: data.accessToken });
  });

  passport.deserializeUser((user: any, done) => {
    User.findOne({ where: { id: user.id } })
      .then((user: any) => {
        const tokenUser = { user: user, accessToken: user.accessToken };
        done(null, tokenUser);
      })
      .catch((err) => done(err));
  });

  local();
  kakao();
};
