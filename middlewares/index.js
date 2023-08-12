"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send("로그인 하세요");
    }
};
exports.isLoggedIn = isLoggedIn;
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        const message = encodeURIComponent("로그인한 상태");
        res.redirect(`/?error=${message}`);
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
