import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user";
import { RequestHandler } from "express";

type AuthError = Error | null;
type UserInfo = {
  message: string;
};

const join: RequestHandler = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next?.(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  passport.authenticate(
    "local",
    (authError: AuthError, user: User | false, info: UserInfo) => {
      if (authError) {
        console.error(authError);
        return next?.(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next?.(loginError);
        }
        return res.redirect("/");
      });
    }
  )(req, res, next);
};

const logout: RequestHandler = async (req, res, next) => {
  req.logout(() => {
    res.send("logout");
  });
};

export { join, login, logout };
