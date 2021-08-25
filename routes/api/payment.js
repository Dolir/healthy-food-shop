require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const YOUR_DOMAIN = "http://localhost:3000/orders";
// router.post("/create-checkout-session", async (req, res) => {
//   const product = await stripe.products.create({
//     name: "Ambrosia Apple",
//   });
//   const price = await stripe.prices.create({
//     product: product.id,
//     unit_amount: 20000,
//     currency: "eur",
//   });
//   const session = await stripe.checkout.sessions.create({
//     customer_email: "customer@example.com",
//     billing_address_collection: "auto",
//     line_items: [
//       {
//         price: price.id,
//         quantity: 1,
//       },
//     ],
//     payment_method_types: ["card", "giropay", "sofort"],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.json(session.url);
// });
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
