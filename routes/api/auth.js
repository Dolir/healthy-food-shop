const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
var ObjectId = require("mongodb").ObjectId;
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              reviews: user.reviews,
              orders: user.orders,
              cart: user.cart,
            },
          });
        }
      );
    });
  });
});
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
router.post("/cart", (req, res) => {
  User.updateOne(
    { _id: req.body.userID },
    { $push: { cart: req.body.item } }
  ).then((response) => res.json(response));
});
router.delete("/cart", async (req, res) => {
  console.log(req.query);
  const { userID } = req.query;
  const { itemID } = req.query;

  const result = await User.aggregate([
    { $match: { _id: ObjectId(userID) } },
    {
      $project: {
        cart: {
          $filter: {
            input: "$cart",
            as: "cart",
            cond: { $ne: ["$$cart._id", itemID] },
          },
        },
      },
    },
  ]);

  User.updateOne({ _id: userID }, { $set: { cart: result[0].cart } }).then(
    (response) => res.json(response)
  );
  result.map((x) => console.log(x.cart));
});
module.exports = router;
