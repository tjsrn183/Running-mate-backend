import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user";
import { RequestHandler } from "express";
import axios from "axios";

const join: RequestHandler = async (req, res, next) => {
  const { nick, id, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { user_id: id } });
    if (exUser) {
      res.json({ message: "이미 가입된 아이디입니다." });
      res.end();
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      user_id: id,
      nick: nick,
      password: hash,
      provider: "local",
    });
    res.json({ message: "회원가입 성공" });

    res.end();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const login: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    (authError: Error, user: Express.User, authInfo: Express.AuthInfo) => {
      if (authError) {
        console.error(authError);
        res.send([]);
        return next(authError);
      }
      if (!user) {
        return res.json({ message: authInfo.message });
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          res.send([]);
          return next(loginError);
        }
        res.json({ message: "로그인 성공" });
        res.end();
      });
    }
  )(req, res, next);
};

const logout: RequestHandler = async (req, res) => {
  try {
    const ACCESS_TOKEN = res.locals.user.accessToken;

    if (req.user?.user.provider == "kakao") {
      await axios({
        method: "post",
        url: "https://kapi.kakao.com/v1/user/logout",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
    }

    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const userInfo: RequestHandler = (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({
      message: "사용자가 로그인되어 있지 않습니다.3트",
    });
  }
};

export { join, login, logout, userInfo };
