const express = require("express");
const {
  home,
  homeProduct,
  stockProduct,
  detailProduct,
  editProduct,
  updateProduct,
  addProduct,
} = require("./controllers/controller");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.get("/products", homeProduct);
app.get("/products/add", addProduct);

app.get("/products/stock", stockProduct);
app.get("/products/stock/:id", detailProduct);
app.get("/products/stock/:id/edit", editProduct);
app.post("/products/stock/:id/edit", updateProduct);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
