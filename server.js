const express = require("express");
const mongoose = require("mongoose");
const items = require("./routes/api/Items");
const config = require("config");
const path = require("path");
const app = express();

app.use(express.json());

const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!!!"))
  .catch((err) => console.log(err));

app.use("/api/items", items);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/my-app/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "my-app", "build", "index.html")
    );
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server Started on port ${port}`));
