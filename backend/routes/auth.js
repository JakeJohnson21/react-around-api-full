const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

// const { NotFoundError } = require("../errors/not-found-error");

router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

// router.use((req, res, next) => {
//   next(new NotFoundError("No page found for this route"));
// });

module.exports = router;
