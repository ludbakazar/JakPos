const {
  homeSupplier,
  showSupplier,
  addSupplier,
  saveSupplier,
  detailSupplier,
  editSupplier,
  updateSupplier,
} = require("../controllers/controller");

const router = require("express").Router();

router.get("/", showSupplier);
router.get("/home", homeSupplier);
router.get("/add", addSupplier);
router.post("/add", saveSupplier);
router.get("/:id/detail", detailSupplier);
router.get("/:id/edit", editSupplier);
router.post("/:id/edit", updateSupplier);

module.exports = router;
