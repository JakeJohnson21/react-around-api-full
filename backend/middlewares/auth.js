const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { JWT_SECRET } = require("../utils/config");

// console.log("hello1");
const auth = (req, res, next) => {
  // console.log("hello2");
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  console.log("payload._id in AUTH: ", payload._id);
  console.log("payload in AUTH: ", payload[1]);

  req.user = payload;
  console.log("req.user in AUTH: ", req.user._id);

  return next();
};

module.exports = auth;
