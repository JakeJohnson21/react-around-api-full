const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
// const expressRateLimit = require("express-rate-limit");
const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const NotFoundError = require("./errors/not-found-error");
const { mongoServerAddress } = require("./utils/utils");

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
// ______________________________________________
app.use(requestLogger);

mongoose.connect(mongoServerAddress);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(expressRateLimit(20));
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", authRouter);
app.use(authMiddleware);
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use("*", (req, res) => {
  res.send(new NotFoundError("Requested resource not found"));
});
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
