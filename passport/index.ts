import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import User from "../models/user";

export default () => {
  passport.serializeUser((user: any, done) => {
    console.log("user의 타입을 알아보자", user);
    done(null, { id: user.id, accessToken: user.accessToken });
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
