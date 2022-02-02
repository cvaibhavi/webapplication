const router = require("express").Router();
router.get("/", async (req, res, next) => {
  try {
    res.render("secondDesign");
  } catch (error) {
    next(error);
  }
});

module.exports = router;