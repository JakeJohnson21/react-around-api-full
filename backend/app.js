const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");
const { errorLogger, requestLogger } = require("./middlewares/logger");

require("dotenv").config();

const errorHandler = require("./middlewares/error-handler");
const index = require("./routes/index");
const user = require("./routes/index");

const NotFoundError = require("./errors/not-found-error");

const { PORT = 3000 } = process.env;
const app = express();
// ______________________________________________
app.use(requestLogger);

mongoose.connect("mongodb://34.134.215.158");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressRateLimit());

app.use("/", index);
app.use("/", user);
app.use("*", (req, res) => {
  res.send(new NotFoundError("Requested resource not found"));
});
app.use(helmet());

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
