const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

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
      .custom((value) => validator.isUrl(value))
      .message("The avatar field must be a valid URL"),
    email: Joi.string().required().messages({
      "string.empty": `The "email" field must be filled in`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required.min(2).max(30).message({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
    link: Joi.string()
      .required()
      .custom((value) => validator.isUrl(value))
      .message("the link field must have a valid URL")
      .messages({
        "string-empty": "The link field must be filled in",
      }),
  }),
});

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
    url: Joi.string().custom((value) => validator.isUrl(value)),
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
  validateCardBody,
  validateUserBody,
  validateAuthentication,
  validateAvatar,
  validateProfile,
};
