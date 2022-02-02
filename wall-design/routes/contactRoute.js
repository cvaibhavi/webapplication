const router = require("express").Router();
const { sendMail } = require("../helpers/mail_sender");

router.get("/", async (req, res, next) => {
  try {
    res.render("contact");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { message, name, city } = req.body;

    if (!message || message.trim().length <= 0) {
      req.flash("error", `message required`);
      return res.redirect("contact");
    }
    sendMail(message, name, city)
      .then(() => {
        req.flash("success", `message sent successfully`);
        res.redirect("contact");
      })
      .catch((error) => {
        req.flash("error", `something went wrong`);
        res.redirect("contact");
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
