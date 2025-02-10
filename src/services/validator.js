import joi from "joi";

// Define the Joi schema
const schema = joi.object({
  username: joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a type of string',
    'string.empty': 'Username cannot be an empty field',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should not exceed 30 characters',
    'any.required': 'Username is required',
  }),

  password: joi.string().min(6).max(128).required().messages({
    'string.base': 'Password should be a type of string',
    'string.empty': 'Password cannot be an empty field',
    'string.min': 'Password should have at least 6 characters',
    'string.max': 'Password should not exceed 128 characters',
    'any.required': 'Password is required',
  }),

  email: joi.string()
    .email({ tlds: { allow: false } }) // optional, restrict TLDs if needed
    .required()
    .messages({
      'string.base': 'Email should be a type of string',
      'string.empty': 'Email cannot be an empty field',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  age: joi.number()
    .integer()
    .min(18) // Example: Minimum age is 18
    .max(120)
    .required()
    .messages({
      'number.base': 'Age should be a number',
      'number.integer': 'Age should be an integer',
      'number.min': 'Age should be at least 18',
      'number.max': 'Age should not exceed 120',
      'any.required': 'Age is required',
    }),

  dateOfBirth: joi.date()
    .less('now') // Ensure the date of birth is in the past
    .required()
    .messages({
      'date.base': 'Date of birth should be a valid date',
      'date.less': 'Date of birth must be in the past',
      'any.required': 'Date of birth is required',
    }),

  phoneNumber: joi.string()
    .pattern(/^[0-9]{10}$/) // Example: 10-digit phone number
    .required()
    .messages({
      'string.base': 'Phone number should be a type of string',
      'string.empty': 'Phone number cannot be an empty field',
      'string.pattern.base': 'Phone number must be a valid 10-digit number',
      'any.required': 'Phone number is required',
    }),

  role: joi.string()
    .valid('admin', 'user', 'moderator') // Example: Only certain roles are allowed
    .required()
    .messages({
      'string.base': 'Role should be a type of string',
      'string.empty': 'Role cannot be an empty field',
      'any.only': 'Role must be one of the following: admin, user, moderator',
      'any.required': 'Role is required',
    }),
});

export {schema};