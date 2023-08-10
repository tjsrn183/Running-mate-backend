import { ReqResNext } from "..";

const isLoggedIn = ({ req, res, next }: ReqResNext) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 하세요");
  }
};
const isNotLoggedIn = ({ req, res, next }: ReqResNext) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태");
    res.redirect(`/?error=${message}`);
  }
};

export { isLoggedIn, isNotLoggedIn };
