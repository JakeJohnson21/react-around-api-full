const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const expressRateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error-handler");
const authRouter = require("./routes/auth");
// const userRouter = require("./routes/users");
// const cardRouter = require("./routes/cards");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const NotFoundError = require("./errors/not-found-error");
const { DB_ADDRESS } = require("./utils/config");

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
// ______________________________________________
app.use(requestLogger);

mongoose.connect(DB_ADDRESS);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressRateLimit());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
// app.use("/", authRouter);
// app.use("/users", userRouter);
// app.use("/cards", cardRouter);

app.use("*", (req, res) => {
  res.send(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
