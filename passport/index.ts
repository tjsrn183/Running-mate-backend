import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import User from "../models/user";

interface userSession {
  id: number;
  accessToken: string;
}
export default () => {
  passport.serializeUser((data: any, done) => {
    console.log("serializeUser에서의 accessToken", data.accessToken);
    done(null, { id: data.user.id, accessToken: data.accessToken });
  });

  passport.deserializeUser((user: userSession, done) => {
    User.findOne({ where: { id: user.id } })
      .then((result: any) => {
        const tokenUser = { user: result, accessToken: user.accessToken };
        console.log("deserializeUser에서의 tokenUser", tokenUser.accessToken);
        done(null, tokenUser);
      })
      .catch((err) => done(err));
  });

  local();
  kakao();
};
