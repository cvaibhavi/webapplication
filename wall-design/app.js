const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");
require("./helpers/init_mongodb");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure:true,
      httpOnly: true,
    },
  })
);

app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport_auth");
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
app.set("view engine", "ejs");

const AuthRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const aboutRoute = require("./routes/aboutRoute");
const contactRoute = require("./routes/contactRoute");
const sampleRoute = require("./routes/sampleRoute");
const paintsampleRoute = require("./routes/paintsampleRoute");
const firstDesignRoute = require("./routes/firstDesignRoute");
const secondDesignRoute = require("./routes/secondDesignRoute");
const hanginsampleRoute = require("./routes/hangingsampleRoute");

app.all("/", ensureAuthenticated, homeRoute);
app.use("/auth", AuthRoute);
app.use("/contact", ensureAuthenticated, contactRoute);
app.use("/sample", ensureAuthenticated, sampleRoute);
app.use("/about", ensureAuthenticated, aboutRoute);
app.use("/paintsample", ensureAuthenticated, paintsampleRoute);
app.use("/firstDesign", ensureAuthenticated, firstDesignRoute);
app.use("/secondDesign", ensureAuthenticated, secondDesignRoute);
app.use("/hangingsample", ensureAuthenticated, hanginsampleRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}
