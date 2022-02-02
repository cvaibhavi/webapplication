const router = require("express").Router();
router.get("/", async (req, res, next) => {
  try {
    res.render("home");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
