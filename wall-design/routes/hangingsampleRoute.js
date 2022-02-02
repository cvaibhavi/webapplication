const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    res.render("hangingsample");
  } catch (error) {
    next(error);
  }
});

module.exports = router;