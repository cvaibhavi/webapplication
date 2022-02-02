const router = require("express").Router();
const User = require("../models/userModel");
const { authSchema } = require("../helpers/validation_schema");
const passport = require("passport");

router.get("/login", ensureNotAuthenticated, async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  ensureNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/register", ensureNotAuthenticated, async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
});

router.post("/register", ensureNotAuthenticated, async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const { email } = result;
    const doesExist = await User.findOne({ email });

    if (doesExist) {
      req.flash("info", `${email} is already registered please login..`);
      res.redirect("/auth/login");
      return;
    }

    const user = await new User(req.body);
    const savedUser = await user.save();

    res.redirect("/auth/login");
  } catch (error) {
    if (error.isJoi === true) {
      req.flash("error", error.message);
      res.render("register", { messages: req.flash() });
    } else {
      next(error);
    }
  }
});

router.get("/logout", ensureAuthenticated, async (req, res, next) => {
  try {
    req.logout();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}
function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("back");
  } else {
    next();
  }
}
