const passport = require("passport");
require("../config/passport");

// GET requests
const getLogin = (req, res) => {
    res.render("loginForm");
};


// POST requests
const postLogin = (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })(req, res, next);
};


module.exports = {
    getLogin,
    postLogin
}