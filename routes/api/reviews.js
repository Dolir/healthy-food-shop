const express = require("express");
const router = express.Router();
const Review = require("../../models/review");
router.get("/", (req, res) => {
  const { limit } = req.query;
  Review.find()
    .limit(parseInt(limit))
    .then((reviews) => res.json(reviews));
});
module.exports = router;
