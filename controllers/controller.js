const { Supplier, Product, ProductSupplier } = require("../models");
const formatedPrice = require("../helpers/fortmatedPrice");
exports.home = async (req, res) => {
  try {
    res.render("beranda");
  } catch (error) {
    res.send(error);
  }
};
exports.homeProduct = async (req, res) => {
  try {
    res.render("homeProduct");
  } catch (error) {
    res.sen(error.message);
  }
};

exports.stockProduct = async (req, res) => {
  try {
    const data = await Product.findAll({ include: { model: Supplier } });
    // res.send(data);
    res.render("stockProduct", { data, formatedPrice });
  } catch (error) {
    res.send(error.message);
  }
};

exports.detailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findByPk(id, { include: { model: Supplier } });
    // res.send(data);
    res.render("detailProduct", { data, formatedPrice });
  } catch (error) {
    res.send(error.message);
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Product.findByPk(id, { include: { model: Supplier } });
    const supplier = await Supplier.findAll();
    res.render("editProduct", { data, supplier });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const supplierId = req.body.SupplierId;
  const { SupplierId, ...data } = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    await product.update(data);
    await product.setSuppliers(supplierId);
    res.redirect(`/products/stock/${id}`);
  } catch (error) {
    res.send(error.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const supplier = await Supplier.findAll();
    // res.send(supplier);
    res.render("addProduct", { supplier });
  } catch (error) {
    res.send(error.message);
  }
};

exports.saveProduct = async (req, res) => {
  const supplierId = req.body.SupplierId;
  const { SupplierId, ...data } = req.body;
  try {
    const product = await Product.create(data);
    await product.addSupplier(supplierId);
    res.redirect("/products");
  } catch (error) {
    res.send(error.message);
  }
};
