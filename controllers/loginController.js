const passport = require("passport");


// GET requests
const getLogin = (req, res) => {
    res.render("loginForm");
};


// POST requests
const postLogin = (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
};


module.exports = {
    getLogin,
    postLogin
}