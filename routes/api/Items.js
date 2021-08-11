const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
router.get("/", (req, res) => {
  const { limit } = req.query;
  Item.find()
    .limit(parseInt(limit))
    .then((items) => res.json(items));
});
router.get("/reviews", (req, res) => {
  const { limit } = req.query;
  Item.find({}, { reviews: 1, _id: 0 })
    .limit(parseInt(limit))
    .then((reviews) => res.json(reviews));
});
// router.post("/reviews", (req, res) => {
//   console.log(req.body);
//   Item.find()
//     .update({}, { $set: { reviews: [] } })
//     .then((reviews) => res.json(reviews));
//   // Item.updateOne(
//   //   {},
//   //   {
//   //     $set: {
//   //       reviews: [
//   //         {
//   //           text: req.body.text,
//   //           rating: req.body.rating,
//   //           author_name: req.body.author_name,
//   //           date: Date.now(),
//   //         },
//   //       ],
//   //     },
//   //   }
//   // ).then((reviews) => res.json(reviews));
// });
module.exports = router;
