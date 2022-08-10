const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  NotFoundError, //404
  BadRequestError, //400
  ConflictError, //409
  ForbiddenError, //403
  UnauthorizedError, // 401
} = require("../errors/errors");
require("dotenv").config();

const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));

const getUsersById = (id, res, next) =>
  User.findById(id)
    .orFail(() => new NotFoundError("No user with that ID was found"))
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);

//GET /users/:userId
const getCurrentUser = (req, res, next) => {
  getUsersById(req.user._id, res, next);
};
//GET /users/me
const getUser = (req, res, next) => {
  getUsersById(req.params._id, res, next);
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => new UnauthorizedError("Incorrect email or password"));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          "The user with the provided email already exists"
        );
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorStatus).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
      } else {
        res.status(ServerErrorStatus).send({ message: "An error occured" });
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("No user with that id was found"))
    .then((user) => res.send({ data: user }))
    .catch(next);
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error(`No user found with requested id`);
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(CastErrorStatus)
          .send({ message: "The data you have entered is invalid" });
      } else if (err.name === "ValidationError") {
        res
          .status(ValidationErrorStatus)
          .send({ message: "The entered data is invalid" });
      } else if (err.statusCode === 404) {
        res.status(NotFoundErrorStatus).send({ message: "not found" });
      } else {
        res.status(ServerErrorStatus).send({ message: "An error occured" });
      }
    });
};

module.exports = {
  getUser,
  getCurrentUser,
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
