import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user";
import { ReqResNext } from "..";
import { RequestHandler } from "express";

const join = async ({ req, res, next }: ReqResNext) => {
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

const login = async ({ req, res, next }: ReqResNext) => {
  passport.authenticate("local", (authError: string, user: Object, info) => {
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
  })(req, res, next);
};

const logout = async ({ req, res, next }: ReqResNext) => {
  req.logout(({ req, res }: ReqResNext) => {
    res.send("logout");
  });
};

export { join, login, logout };
