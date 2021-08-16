const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  const { limit } = req.query;
  const { skip } = req.query;
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
  Item.find()
    .sort(sort)
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .then((items) => res.json(items));
});
router.get("/count", (req, res) => {
  Item.countDocuments().then((count) => res.json({ count: count }));
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
router.get("/reviewss", (req, res) => {
  mongoose.connection.db.collection("Items", (err, collection) => {
    collection
      .find({}, { projection: { reviews: 1, _id: 0 } })
      .toArray(function (err, data) {
        res.json(data); // it will print your collection data
      });
  });
});
router.put("/", (req, res) => {
  mongoose.connection.db.collection("Items", (err, collection) => {
    collection
      .updateMany({}, { $set: { type: "apple" } })
      .then((res) => res.json(res))
      .catch((err) => res.json(err));
  });
});
router.post("/", (req, res) => {
  mongoose.connection.db.collection("Items", (err, collection) => {
    collection
      .insertMany(
        [
          {
            name: "Cherry tomatoes",
            price: "200",
            description:
              "Cherry tomatoes may not be very large, but they pack a sweet, summery punch. They’re typically red, but can also be yellow, green, or even black. Cherry tomatoes are usually smaller than grape tomatoes and have a softer texture.",
            discount: "0",
            url: "https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-CherryTtomatoes.jpg",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Heirloom Tomatoes",
            price: "220",
            description:
              "The term “heirloom” refers to how tomatoes (and plenty of other fruits and vegetables) are bred. Unlike hybrid tomatoes, which come from cross-bred tomato strains, heirloom tomatoes can be traced down a single genetic line. Basically, they’re purebreds. Heirloom tomatoes are prized for their superior taste and texture, and the come in a variety of colors including orange and deep purple. However, that single strain means that heirloom tomatoes have a shorter shelf life and much less resistance to disease than hybrids.",
            discount: "0",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCsL5kUvIXSlmsdMk9qtqOtXyM3Et6WlKZKw&usqp=CAU",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Beefsteak Tomatoes",
            price: "210",
            description:
              "Beefsteak tomatoes are some of the largest cultivated tomatoes around, with a meaty texture and intense, classic-tomato flavor. They're typically red or pink, certain varieties of beefsteak tomatoes yield purple, black, or yellow fruit. Thanks to their thick consistency and compact seed cavities, beefsteak tomatoes hold up well when sliced, making them perfect for sandwiches.",
            discount: "0",
            url: "https://geturbanleaf.com/wp-content/uploads/2020/08/1000-Tomato.png",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Plum Tomatoes",
            price: "210",
            description:
              "Also known as processing or paste tomatoes, plum tomatoes have an almost cylindrical shape and few seeds, making them perfect for preserving. As a result, they’re popular in premade sauces and tomato paste, or diced and canned (Roma tomatoes are a plum variety). Smaller plum tomatoes are often called grape tomatoes.",
            discount: "0",
            url: "https://freshoffdfarm.com/wp-content/uploads/2020/05/plum-tomatoes.jpg",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Yellow Tomatoes",
            price: "230",
            description:
              "A number of tomato varieties, both heirloom and hybrid, produce yellow fruit. Yellow tomatoes are less acidic than their red counterparts and have a different nutritional value: for example, yellow tomatoes are high in folate, but have less vitamin C than red ones.",
            discount: "0",
            url: "https://oexmarkets.com/wp-content/uploads/2020/03/Yellow-Cherry-Tomatoes.jpg",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Green Tomatoes",
            price: "210",
            description:
              "Several tomato varieties, like the heirloom green zebra or Cherokee green, produce green fruit. However, green tomatoes can also describe unripened red tomatoes which are purposefully harvested early for techniques such breading and frying or pickling.",
            discount: "0",
            url: "https://cen.acs.org/content/dam/cen/92/18/09218-scitech1-tomatocxd.jpg",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Campari Tomatoes",
            price: "250",
            description:
              "Also known as tomatoes on the vine, campari tomatoes fall somewhere between cherry and grape tomatoes in size. These hybrids have a deep red hue, low acidity, super sweet flavor, and a juicy, forgiving texture.",
            discount: "0",
            url: "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/146350/27470c081fd8b542d8913b8021133402_large.png&width=512&type=webp&quality=40",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Pear Tomatoes",
            price: "240",
            description:
              "Pear tomatoes are an heirloom variety known for their small, pear-shaped fruit. They’re sweet and typically yellow, but can also be red or orange.",
            discount: "0",
            url: "https://cdn.shopify.com/s/files/1/0871/0950/products/yellowpearbeams.jpg?v=1572751966",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Brandywine Tomatoes",
            price: "245",
            description:
              "Brandywine tomatoes are a variety of beefsteak tomatoes with large, pink fruit and massive flavor. They’re one of the most beloved heirloom varieties and some of the best-tasting tomatoes around. You’ll want to enjoy these fresh, like in a Caprese salad or classic bruschetta.",
            discount: "0",
            url: "https://cdn.shopify.com/s/files/1/0871/0950/products/yellowpearbeams.jpg?v=1572751966",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
          {
            name: "Cherokee Purple Tomatoes",
            price: "245",
            description:
              "Another heirloom beefsteak variety, Cherokee purple tomatoes have a distinctive appearance thanks to their dark flesh and clear skin. They’re dense, juicy, and best enjoyed raw and fresh, so go ahead and slice them up for a summer salad.",
            discount: "0",
            url: "https://cdn.shopify.com/s/files/1/0871/0950/products/CherokeePurple2_1024x1024.gif?v=1579645395",
            category: "vegetables",
            reviews: [],
            type: "tomato",
          },
        ],
        { ordered: false }
      )
      .then((res) => res.json(res))
      .catch((err) => res.json(err));
  });
});
module.exports = router;
