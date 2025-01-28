const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET requests

const getSignUp = (req, res) => {
    res.render("signUpForm");
};


// Sanitization / Validation

const validate = [
  body("username")
    .trim()
    .isLength({ min: 8, max: 50 })
    .withMessage(`Username must be between 8 and 50 characters.`)
    .custom(async username => {
      const user = await db.getUserByUsername(username);
      if (user) { 
        throw new Error("Username already in use.") 
      }
    }),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1, 
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false
    })
    .withMessage(`Password does not meet the requirements listed above.`),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords do not match.`)
];


// POST requests

const postSignUp = [
    validate,

    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).render("signUpForm", {
          errors: errors.mapped(),
          username: req.body.username,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        });
      }
      next();
    },

    asyncHandler(async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addNewUser(req.body.username, hashedPassword);
        
        res.redirect("/login");
    })
];
  

  module.exports = { 
    getSignUp,
    postSignUp
   }