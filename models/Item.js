const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { collection: "Items" }
);
module.exports = Item = mongoose.model("Item", ItemSchema);
