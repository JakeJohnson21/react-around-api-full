const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  NotFoundError, // 404
  BadRequestError, // 400
  ConflictError, // 409
  UnauthorizedError, // 401
} = require("../errors/errors");
require("dotenv").config();

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));
};
const getUsersById = (_id, res, next) =>
  User.findById(_id)
    .orFail(() => new NotFoundError("No user with that ID was found"))
    .then((user) => res.send({ data: user }))
    .catch(next);

const getUser = (req, res, next) => {
  getUsersById(req.user.id, res, next);
};

// GET /users/:userId
const getCurrentUser = (req, res, next) => {
  getUsersById(req.user.id, res, next);
};

// console.log(getCurrentUser());
// GET /users/me

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => new UnauthorizedError("Incorrect email or password"));
};

const createUser = (req, res, next) => {
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
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`
          )
        );
      } else {
        next(err);
      }
    });
};

// const updateUserData = (req, res, next) => {
//   const { id } = req.user;
//   const { name, about } = req.body;

//   User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
//     .orFail(() => new NotFoundError("No user with that id was found"))
//     .then((user) => res.send({ data: user }))
//     .catch(next);
// };
// // PATCH /users/me
// const updateUser = (req, res, next) => updateUserData(req, res, next);
// // PATCH /users/me/avatar
// const updateAvatar = (req, res, next) => updateUserData(req, res, next);

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  console.log(" #1 id / name , about: ", req.user._id, name, about);
  User.findByIdAndUpdate(
    { id, name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("No user with that id was found"))
    .then((user) => {
      console.log(" #2 id / name , about: ", req.user._id, name, about);
      res.send({ data: user });
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  console.log(" #1 id / avatar: ", req.user._id, avatar);
  User.findByIdAndUpdate({ id, avatar }, { new: true, runValidators: true })

    .orFail(() => new NotFoundError("No user found with that ID"))
    .then((user) => {
      console.log(" #2 id / avatar: ", req.user._id, avatar);
      res.send({ data: user });
    })
    .catch(next);
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
