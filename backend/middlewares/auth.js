const UnauthorizedError = require("../errors/unauthorized-error");
const JWT_SECRET = require("../utils/config");

// console.log("hello1");
const auth = (req, res, next) => {
  // console.log("hello2");
  const { authorization } = req.headers;
  // console.log(authorization, authorization.startsWith("Bearer "));
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  // console.log("hello3");
  try {
    // console.log(token, JWT_SECRET);
    payload = jwt.verify(token, JWT_SECRET);
    console.log("payload: ", payload);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }
  // console.log(req.user);
  req.user = payload;

  return next();
};

module.exports = auth;
