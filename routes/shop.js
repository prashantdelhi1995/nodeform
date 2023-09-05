const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("in second middleware");
  res.send("<h1>Hello</h1>");
});

module.exports = router;
