const passport = require("passport");
require("../config/passport");

// GET requests
const getLogin = (req, res) => {
    res.render("loginForm");
};


// POST requests
const postLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            return res.render("loginForm", { message: info.message });
        }
        
        req.login(user, (err) => {
            if (err) { return next(err) }
            return res.redirect("/");
        })
    })(req, res, next);
};

passport.auth
module.exports = {
    getLogin,
    postLogin
}