import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const pageRouter = require("./routes/page");

const app = express();
app.set("port", process.env.PORT || 8001);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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

app.use("/", pageRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url}라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
