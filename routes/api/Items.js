const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const { skip } = req.query;
  let searchTerm;
  if (req.query.searchTerm !== "undefined") {
    searchTerm = req.query.searchTerm;
  }
  let filters;
  if (req.query.filters !== "undefined") {
    filters = JSON.parse(req.query.filters);
  }

  let { sort } = req.query;
  switch (sort) {
    case "Alphabet":
      sort = { name: 1 };
      break;
    case "Price(high to low)":
      sort = { price: -1 };
      break;
    case "Price(low to high)":
      sort = { price: 1 };
      break;
    default:
      sort = { name: 1 };
      break;
  }

  if (filters) {
    Item.find({
      name: searchTerm ? { $regex: searchTerm, $options: "$i" } : { $ne: null },
      price: filters.maxprice
        ? { $gte: filters.minprice, $lte: filters.maxprice }
        : { $ne: undefined },
      category:
        filters.category.length !== 0 ? filters.category : { $ne: undefined },
      type: filters.type.length !== 0 ? filters.type : { $ne: undefined },
      discount:
        filters.additional.length !== 0 ? { $gt: "0" } : { $ne: undefined },
    })
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .then((items) => res.json(items));
  } else {
    Item.find({
      name: searchTerm ? { $regex: searchTerm, $options: "$i" } : { $ne: null },
      price: filters
        ? { $gte: filters.minprice, $lte: filters.maxprice }
        : { $ne: undefined },
      category: filters ? filters.category : { $ne: undefined },
      type: filters ? filters.type : { $ne: undefined },
      discount: filters ? { $gt: "0" } : { $ne: undefined },
    })
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .then((items) => res.json(items));
  }
});

router.get("/count", (req, res) => {
  let searchTerm;
  if (req.query.searchTerm !== "undefined") {
    searchTerm = req.query.searchTerm;
  }
  const filters = JSON.parse(req.query.filters);
  Item.countDocuments({
    name: searchTerm
      ? { $regex: searchTerm, $options: "$i" }
      : { $ne: undefined },
    price: filters.maxprice
      ? { $gte: filters.minprice, $lte: filters.maxprice }
      : { $ne: undefined },
    category:
      filters.category.length !== 0 ? filters.category : { $ne: undefined },
    type: filters.type.length !== 0 ? filters.type : { $ne: undefined },
    discount:
      filters.additional.length !== 0 ? { $gt: "0" } : { $ne: undefined },
  }).then((count) => res.json({ count: count }));
});
router.get("/maxprice", (req, res) => {
  Item.findOne({}, { price: 1, _id: 0 })
    .sort({ price: -1 })
    .limit(1)
    .then((max) => res.json(max));
});
router.get("/minprice", (req, res) => {
  Item.findOne({}, { price: 1, _id: 0 })
    .sort({ price: +1 })
    .limit(1)
    .then((max) => res.json(max));
});
router.get("/reviews", async (req, res) => {
  const { limit } = req.query;
  const response = await Item.find(
    { reviews: { $ne: [] } },
    { reviews: 1, _id: 0 }
  ).limit(parseInt(limit));

  const result = response.map((x) => x.reviews);
  res.json(result);
});
router.post("/reviews", (req, res) => {
  const { itemID, review } = req.body;
  Item.updateOne({ _id: itemID }, { $push: { reviews: review } }).then(
    (response) => res.json(response)
  );
});
router.delete("/reviews", async (req, res) => {
  const { reviewID, itemID } = req.query;

  const chosenItem = await Item.findOne({ _id: itemID }, { reviews: 1 });
  const result = chosenItem.reviews.filter((x) => x._id !== reviewID);
  if (result[0] === null) {
    Item.updateOne({ _id: itemID }, { $set: { reviews: [] } }).then(
      (response) => res.json(response)
    );
  } else {
    Item.updateOne({ _id: itemID }, { $set: { reviews: result[0] } }).then(
      (response) => res.json(response)
    );
  }
});
router.get("/id/:id", (req, res) => {
  Item.findOne({ _id: req.params.id }).then((item) => res.json(item));
});

module.exports = router;
