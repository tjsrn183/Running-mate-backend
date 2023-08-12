import express, { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
//import pageRouter from "./routes/page";
import { RequestHandler } from "express";
import { sequelize } from "./models";
import passportConfig from "./passport";
import passport from "passport";
import authRouter from "./routes/auth";

//에러핸들러
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
};

dotenv.config();

const app = express();
passportConfig();
app.use((req, res, next) => {
  res.send("제발작동해라2");
  next();
});
app.set("port", process.env.PORT || 8001);
app.use(morgan("dev"));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(passport.initialize());
app.use(passport.session());
//app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use((req, res, next) => {
  try {
    const error = new Error(`${req.method} ${req.url}라우터가 없습니다.`);
    res.json({ status: "404" });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), " 번포트에서 대기 중");
});
