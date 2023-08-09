"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMain = exports.renderJoin = exports.renderProfile = void 0;
const renderProfile = (req, res) => {
    res.render("profile", { title: "내정보 - 황선구" });
};
exports.renderProfile = renderProfile;
const renderJoin = (req, res) => {
    res.render("join", { title: "회원가입- 러닝메이트" });
};
exports.renderJoin = renderJoin;
const renderMain = (req, res) => {
    const runItem = [];
    res.render("main", { title: "Main- 러닝메이트", runItem });
};
exports.renderMain = renderMain;
