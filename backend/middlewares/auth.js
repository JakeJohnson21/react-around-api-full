const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { JWT_SECRET } = require("../utils/config");

console.log("hello1");
const auth = (req, res, next) => {
  console.log("hello2");
  const { email } = req.headers;
  const { authorization } = req.headers;
  console.log("email: ", email);
  console.log("authorization: ", authorization);
  console.log("req.headers: ", req.headers);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("token: ", token);
    console.log("jwt-secret: ", JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
