const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET requests

const getSignUp = (req, res) => {
    res.render("signUpForm");
};


// Sanitization / Validation

const lengthErr = "must be between 8 and 50 characters.";

const validate = [
  body("username").trim()
    .isLength({ min: 8, max: 50 }).withMessage(`Username ${lengthErr}`),

    body("password").trim()
    .isLength({ min: 8, max: 50 }).withMessage(`Password ${lengthErr}`),

];


// POST requests

const postSignUp = [
    validate,
    asyncHandler(async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.addNewUser(req.body.username, hashedPassword);
        res.redirect("/");
    })
];
  

  module.exports = { 
    getSignUp,
    postSignUp
   }