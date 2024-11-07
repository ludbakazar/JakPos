const express = require("express");
const {
  home,
  homeProduct,
  stockProduct,
  detailProduct,
  editProduct,
  updateProduct,
  addProduct,
  saveProduct,
  deleteProduct,
  homeSupplier,
  showSupplier,
  detailSupplier,
  editSupplier,
  updateSupplier,
  addSupplier,
  saveSupplier,
  addUser,
  saveUser,
  addUserProfile,
  saveUserProfile,
  login,
  logged,
} = require("./controllers/controller");
const app = express();
const port = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Anjingeedaann",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

function checkSession(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

app.get("/login", login);
app.post("/login", logged);

app.get("/user/create", addUser);
app.post("/user/create", saveUser);
app.get("/user/:id/userprofile", addUserProfile);
app.post("/user/:id/userprofile", saveUserProfile);
app.use(checkSession);

app.get("/home", home);
app.get("/products/home", homeProduct);
app.get("/products/add", addProduct);
app.post("/products/add", saveProduct);

app.get("/products/stock", stockProduct);
app.get("/products/stock/:id", detailProduct);
app.get("/products/stock/:id/edit", editProduct);
app.post("/products/stock/:id/edit", updateProduct);
app.get("/products/stock/:id/delete", deleteProduct);
app.get("/supplier/home", homeSupplier);
app.get("/supplier", showSupplier);
app.get("/supplier/add", addSupplier);
app.post("/supplier/add", saveSupplier);
app.get("/supplier/:id/detail", detailSupplier);
app.get("/supplier/:id/edit", editSupplier);
app.post("/supplier/:id/edit", updateSupplier);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
