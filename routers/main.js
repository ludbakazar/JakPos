const { showUser, home } = require("../controllers/controller");

const router = require("express").Router();

router.get("/user", showUser);
router.get("/home", home);
router.use("/products", require("./products"));
router.use("/supplier", require("./supplier"));
module.exports = router;
