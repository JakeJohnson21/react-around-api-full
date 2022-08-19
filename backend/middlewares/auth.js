const UnauthorizedError = require("../errors/unauthorized-error");
const { JWT_SECRET } = require("../utils/config");
console.log("hello1");
const auth = (req, res, next) => {
  console.log("hello2");
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  console.log("hello3");
  try {
    payload = token.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }
  console.log(req.user);
  req.user = payload;

  return next();
};

module.exports = auth;
