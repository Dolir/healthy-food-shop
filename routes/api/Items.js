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
            name: "Valencia Orange",
            price: "165",
            description:
              "Oddly enough, the valencia orange is not from the city in Spain, but was created in southern California sometime in the mid-19th century. Though it is among the most common oranges in the U.S., it’s also the only major variety to be harvested in the summer; the season runs from March to July. Very sweet, with low acidity and a bright orange color, the valencia is the most common juicing orange, though it’s also eaten.",
            discount: "0",
            url: "https://modernfarmer.com/wp-content/uploads/2018/01/valencia1.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Navel Orange",
            price: "170",
            description:
              "It’s not totally clear where the navel orange is from – some say Brazil, some say Portugal – but it’s the most popular orange for eating in the U.S. The navel orange gets its name from the fact that it tries to grow a second orange at its base, which produces an effect somewhat like a human bellybutton. They are often seedless and thus sterile; new navel trees come from cuttings rather than plantings. In flavor, a navel is a bit more bitter than a valencia, but also hardier, with a thicker peel.",
            discount: "5",
            url: "https://modernfarmer.com/wp-content/uploads/2018/02/Navel_Orange.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Clementine",
            price: "200",
            description:
              "Aha! The adorable little nephew of the orange family. The clementine, named after a French missionary who supposedly discovered the variety in Algeria, is actually a hybrid of a sweet orange (something like a valencia or navel, though we don’t know exactly which one) and the mandarin. Clementines are very tiny, very sweet, seedless, and have a fantastically loose skin and minimal pith, making them easy to peel (no tools required, besides maybe a sharp fingernail to get started), and ideal for eating.",
            discount: "5",
            url: "https://modernfarmer.com/wp-content/uploads/2018/01/clementine.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Tangelo",
            price: "190",
            description:
              "The tangelo is most easily identified by its reddish skin and the protruding nipple-like thing on the stem end. It’s extremely juicy and sweet, with a very low amount of acid, which makes it an excellent juicing fruit, but the skin is very tight and hard to peel, which makes it trickier to eat raw.",
            discount: "0",
            url: "https://modernfarmer.com/wp-content/uploads/2018/02/tangelo.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Cara Cara Orange",
            price: "190",
            description:
              "The prettiest of all oranges is the cara cara. It’s a type of navel orange – it’s sometimes labeled “pink navel” or “red navel” – and was discovered in Venezuela in 1976. It is an all-time great orange, extremely sweet but with a complex sort of berry flavor behind it. And best of all is the color: a luscious pink.",
            discount: "0",
            url: "https://moutoncitrus.co.za/wp-content/uploads/2014/11/cara-caras.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Blood Orange",
            price: "185",
            description:
              "The blood orange is probably a natural mutation of the regular orange; it has a deep, sinister red flesh which indicates a high level of antioxidants known as anthocyanins. (Most oranges do not have these.) There are a few different types of blood oranges, the most common of which are the moro and sanguinello. Sometimes you’ll be able to see dark blotches on the skin that indicate the deep red within, sometimes not. Blood oranges are not as sweet as the cara cara, but they do have an appealing sort of raspberry flavor to them. Also, their juice is very pretty.",
            discount: "0",
            url: "https://askthefoodgeek.com/wp-content/uploads/2017/02/Blood-oranges-in-season-1.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Bitter Orange",
            price: "180",
            description:
              "An entirely different lineage, but also derived from a hybrid of the pomelo and the mandarin, the bitter orange is sometimes known as a Seville orange or sour orange. Because it’s completely lacking in sweetness, it’s not generally eaten or juiced for standalone drinking. Bitter orange’s peel is extraordinarily fragrant and is often used as a flavoring or spice in its own right; in the UK, it’s common to see it in marmalade. In Europe, this orange is often used to flavor beers, like the Belgian witbier, or as a dessert spice along with clove and cinnamon. The juice is used as a flavoring or marinating ingredient throughout Latin America, especially with pork, as in the Mexican cochinita pibil.",
            discount: "0",
            url: "https://modernfarmer.com/wp-content/uploads/2018/01/bitter.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Bergamot Orange",
            price: "180",
            description:
              "What? This is an orange? Sure is. The bergamot orange, an extract of which is used in Earl Grey tea, is actually a hybrid of the lemon and the bitter orange. It’s usually lime-green or yellowish in color, sometimes smooth and sometimes sort of lumpy, and as with the bitter orange, it’s chock full of seeds. The juice is very, very sour.",
            discount: "0",
            url: "https://modernfarmer.com/wp-content/uploads/2018/01/bergamot.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Lima Orange",
            price: "190",
            description:
              "One of the more common examples of what’s called an “acidless orange,” the lima is grown extensively in Brazil. It does not, of course, completely lack acid, but the levels are very low, making this one of the sweeter oranges out there. The flesh is fairly light in color, and it has a thick peel along with some seeds.",
            discount: "0",
            url: "https://www.lima-europe.eu/wp-content/uploads/2017/03/shutterstock_571355584.jpg",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
          {
            name: "Heirloom Navel Orange",
            price: "200",
            description:
              "So, this is a weird one. When you hear “heirloom navel,” you’d expect an old variety of the navel orange, perhaps long forgotten. That isn’t really the case; a New York Times article showed that, mostly, heirloom navels are Washington navels, the same variety as other ordinary navels. Because there isn’t really a rule about what is qualifies an orange as “heirloom,” the label isn’t necessarily reliable. But some growers take the name seriously, only using rootstock from sour orange trees, the same way they were grown in the early years of California citrus. This produces a lower yield than using a sweet orange rootstock, but the flavor can be superior. Heirloom navels, at their best, are superbly flavorful; not really different in profile from a regular navel, but with higher sweetness and acidity levels.",
            discount: "0",
            url: "https://cdn.shopify.com/s/files/1/0336/7167/5948/products/image-of-heirloom-navel-oranges-fruit-14763945525292_600x600.jpg?v=1616942190",
            category: "fruits",
            reviews: [],
            type: "orange",
          },
        ],
        { ordered: false }
      )
      .then((res) => res.json(res))
      .catch((err) => res.json(err));
  });
});
module.exports = router;
