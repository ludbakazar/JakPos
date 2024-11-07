const express = require("express");
const {
  home,
  homeProduct,
  stockProduct,
  detailProduct,
} = require("./controllers/controller");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", home);
app.get("/products", homeProduct);
app.get("/products/stock", stockProduct);
app.get("/products/stock/:id", detailProduct);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
