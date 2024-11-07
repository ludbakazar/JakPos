const express = require("express");
const {
  addUser,
  saveUser,
  addUserProfile,
  saveUserProfile,
  login,
  logged,
  showUser,
  logout,
} = require("./controllers/controller");
const app = express();
const port = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const router = require("./routers/main");

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
app.get("/logout", logout);

app.get("/user/create", addUser);
app.post("/user/create", saveUser);
app.get("/user/:id/userprofile", addUserProfile);
app.post("/user/:id/userprofile", saveUserProfile);

app.use(checkSession);
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
