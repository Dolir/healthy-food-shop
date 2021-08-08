const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
router.get("/", (req, res) => {
  const { limit } = req.query;
  Item.find()
    .limit(parseInt(limit))
    .then((items) => res.json(items));
});
module.exports = router;
