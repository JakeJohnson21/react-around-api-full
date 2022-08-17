const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
    }),
    about: Joi.string().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
    }),
    avatar: Joi.string()
      .custom(validateURL)
      .message("The avatar field must be a valid URL"),
    email: Joi.string().required().messages({
      "string.empty": `The "email" field must be filled in`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

// const validateCardBody = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30).message({
//       "string.min": "The minimum length of the name field is 2",
//       "string.max": "The maximum length of the name field is 30",
//       "string.empty": "The name field must be filled in",
//     }),
//   }),
//   avatar: Joi.string()
//     .custom(validateURL)
//     .message("The avatar field must be a valid URL"),
// });

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message("must be a valid email")
      .messages({
        "string.required": `The "email" field must be filled in`,
      }),
    password: Joi.string().required().messages({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

const validateAvatar = celebrate({
  body: {
    url: Joi.string().custom((value) => validator.isURL(value)),
  },
});

const validateProfile = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
    about: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
  },
});

module.exports = {
  // validateCardBody,
  validateUserBody,
  validateAuthentication,
  validateAvatar,
  validateProfile,
};
