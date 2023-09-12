"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtml = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const sanitizefunc = (body) => {
    const filtered = (0, sanitize_html_1.default)(body, {
        allowedTags: [],
    });
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};
const sanitizeHtml = (req, res, next) => {
    try {
        res.locals.result = res.locals.data.map((post) => (Object.assign(Object.assign({}, post.dataValues), { body: sanitizefunc(post.dataValues.content) })));
        console.log("sanitize 라우터에서  res.locals.result찍음", res.locals.result);
        res.json(res.locals.result);
        res.end();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.sanitizeHtml = sanitizeHtml;
