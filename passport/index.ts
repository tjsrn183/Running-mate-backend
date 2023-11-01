import passport from "passport";
import kakao from "./kakaoStrategy";
import User from "../models/user";

interface userSession {
  id: number;
  accessToken: string;
}
export default () => {
  passport.serializeUser((data: any, done) => {
    console.log("시리알라이즈 실행됨");
    done(null, { id: data.user.id, accessToken: data.accessToken });
  });

  passport.deserializeUser((user: userSession, done) => {
    User.findOne({ where: { id: user.id } })
      .then((result: any) => {
        const tokenUser = { user: result, accessToken: user.accessToken };

        done(null, tokenUser);
      })
      .catch((err) => done(err));
  });

  kakao();
};
