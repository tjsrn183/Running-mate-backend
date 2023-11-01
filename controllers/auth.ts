import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user";
import { RequestHandler } from "express";

const join: RequestHandler = async (req, res, next) => {
  const { nick, id, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { user_id: id } });
    if (exUser) {
      res.json({ message: "이미 가입된 아이디입니다." });
      res.end;
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      user_id: id,
      nick: nick,
      password: hash,
      provider: "local",
    });
    res.json({ message: "회원가입 성공" });
    res.end;
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const login: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (authError: any, user: any, info: any) => {
    console.log("authError, user,info 타입수정해라", authError, user, info);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json({ message: "로그인 성공" });
    });
  })(req, res, next);
};
const logout: RequestHandler = (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.end();
    });
  });
};
export { join, login };
