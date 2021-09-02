require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
router.post("/create-payment-intent", async (req, res) => {
  const calculateOrderAmount = (items) => {
    let sum = 0;
    items.map((x) => (sum += parseInt(x.price) * x.quantity));

    return sum * 100;
  };
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    created: paymentIntent.created,
    amount: paymentIntent.amount,
  });
});
module.exports = router;
