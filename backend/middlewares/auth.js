const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { JWT_SECRET } = require("../utils/config");

// console.log("hello1");
const auth = (req, res, next) => {
  // console.log("hello2");
  const { authorization } = req.headers;
  console.log("authorization: ", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("token: ", token);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
