const express = require("express");

const mongoose = require("mongoose");
const items = require("./routes/api/Items");
const user = require("./routes/api/Users");
const auth = require("./routes/api/auth");
const payment = require("./routes/api/payment");
const config = require("config");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected!!!"))
  .catch((err) => console.log(err));

app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/items", items);

app.use("/api/payment", payment);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server Started on port ${port}`));
