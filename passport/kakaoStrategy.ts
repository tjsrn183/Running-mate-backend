import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import User from "../models/user";

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        console.log("kakao accessToken", accessToken);
        console.log("kakao refreshToken", refreshToken);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          const tokenUser = {
            user: exUser,
            accessToken: accessToken,
          };
          if (exUser) {
            done(null, tokenUser);
          } else {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            const tokenNewUser = {
              user: newUser,
              accessToken: accessToken,
            };
            done(null, tokenNewUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
