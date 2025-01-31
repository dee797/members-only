// node_modules imports
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);


// Router / Controller imports
const signUpRouter = require("./routes/signUpRouter");
const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const { isAuthenticated } = require("./controllers/authenticateController");


// Configurations
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

/** 
 * Prevent web pages from being cached in browser, 
 * as caching causes issues with the login system 
 * if user uses the back/forward buttons
 */ 

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
})


// Session Setup
app.use(session({ 
  store: new pgSession({
    pool: require("./db/pool")
  }),
  secret: process.env.SECRET, 
  genid: () => require("crypto").randomBytes(32).toString("hex"),
  resave: false, 
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  unset: "destroy"
}));


//Passport Authentication
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});



// Routing
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);

app.get("/logout", isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("connect.sid");
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
});

app.get("/error", (req, res) => {
  res.render("partials/noscriptError");
})

app.get("/", indexRouter);


// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message || "Internal server error");
});

app.all("/*", (req, res, next) => {
  res.status(404).send("404 - Not found");
  ;
});



const PORT = process.env.PORT || 3000;
app.listen(PORT);
