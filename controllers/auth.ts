import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user";
import { RequestHandler } from "express";

type AuthError = Error | null;
type UserInfo = {
  message: string;
};

const join: RequestHandler = async (req, res, next) => {
  const { id, password, name, phoneNumber, nickname, birthday, sex } = req.body;

  try {
    const exUser = await User.findOne({ where: { user_id: id } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      user_id: id,
      nick: nickname,
      password: hash,
      name: name,
      phoneNumber: phoneNumber,
      birthday: birthday,
      sex: sex,
      provider: "local",
    });

    return res.redirect("http://localhost:3000/login");
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
        return res.redirect("http://localhost:3000");
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
