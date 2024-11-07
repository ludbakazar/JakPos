const {
  homeProduct,
  addProduct,
  saveProduct,
  stockProduct,
  detailProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/controller");

const router = require("express").Router();

router.get("/home", homeProduct);
router.get("/add", addProduct);
router.post("/add", saveProduct);

router.get("/stock", stockProduct);
router.get("/stock/:id", detailProduct);
router.get("/stock/:id/edit", editProduct);
router.post("/stock/:id/edit", updateProduct);
router.get("/stock/:id/delete", deleteProduct);

module.exports = router;
