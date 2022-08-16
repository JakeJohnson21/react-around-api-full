const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    required: false,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    maxlength: 30,
    required: false,
    default: "explorer",
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (value) => validator.isURL(value),
      message: `The "avatar" field must be a valid URL`,
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
  },

  email: {
    type: String,
    required: [true, "Valid email is required"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: `The "email" field must be a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};
userSchema.methods.toJSON = function () {
  const { password, ...obj } = this.toObject();
  return obj;
};
module.exports = mongoose.model("user", userSchema);
