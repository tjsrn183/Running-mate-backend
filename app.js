"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const page_1 = __importDefault(require("./routes/page"));
const models_1 = require("./models");
const passport_1 = __importDefault(require("./passport"));
const passport_2 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const run_1 = __importDefault(require("./routes/run"));
const chat_1 = __importDefault(require("./routes/chat"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket");
//에러핸들러
const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
};
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, passport_1.default)();
app.set("port", process.env.PORT || 8003);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname + "/public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
const sessionMiddleware = app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log("데이터베이스 연결성공");
})
    .catch((err) => {
    console.error(err);
});
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
app.use("/auth", auth_1.default);
app.use("/post", post_1.default);
app.use("/run", run_1.default);
app.use("/chat", chat_1.default);
app.use("/", page_1.default);
app.use((req, res, next) => {
    try {
        const error = new Error(`${req.method} ${req.url}라우터가 없습니다.`);
        res.json({ status: "404" });
    }
    catch (error) {
        next(error);
    }
});
app.use(errorHandler);
const server = app.listen(app.get("port"), () => {
    console.log(app.get("port"), " 번포트에서 대기 중");
});
(0, socket_1.socketFunc)(server, app);
