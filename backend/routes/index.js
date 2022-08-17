const router = require("express").Router();
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

const { NotFoundError } = require("../errors/not-found-error");

router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

router.use(auth);
router.use("/", userRouter);
router.use("/", cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError("No page found for this route"));
});

module.exports = router;
