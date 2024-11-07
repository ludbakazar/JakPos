const {
  Supplier,
  Product,
  ProductSupplier,
  User,
  UserProfile,
} = require("../models");
const formatedPrice = require("../helpers/fortmatedPrice");
const { where, Op } = require("sequelize");
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
  const { keyword } = req.query;
  try {
    const summary = await Product.summary();
    console.log(summary);
    const data = await Product.getProduct(keyword, Supplier);
    res.render("stockProduct", { data, formatedPrice, summary });
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
    res.redirect("/products/home");
  } catch (error) {
    res.send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductSupplier.destroy({ where: { ProductId: id } });
    const deletedProduct = await Product.findByPk(id);
    await deletedProduct.destroy();
    res.redirect("/products/stock");
  } catch (error) {
    res.send(error.message);
  }
};

exports.homeSupplier = async (req, res) => {
  try {
    res.render("homeSupplier");
  } catch (error) {
    res.send(error.message);
  }
};

exports.showSupplier = async (req, res) => {
  try {
    const data = await Supplier.findAll();
    // res.send(data);
    res.render("supplier", { data });
  } catch (error) {
    res.send(error.message);
  }
};

exports.detailSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Supplier.findByPk(id, { include: { model: Product } });
    // res.send(data);
    res.render("detailSupplier", { data, formatedPrice });
  } catch (error) {
    res.send(error.message);
  }
};

exports.editSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Supplier.findByPk(id);
    res.render("editSupplier", { data });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateSupplier = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const supplier = await Supplier.findByPk(id);
    await supplier.update(data);
    res.redirect("/supplier");
  } catch (error) {
    res.send(error.message);
  }
};

exports.addSupplier = async (req, res) => {
  try {
    res.render("addSupplier");
  } catch (error) {
    res.send(error.message);
  }
};

exports.saveSupplier = async (req, res) => {
  const data = req.body;
  try {
    await Supplier.create(data);
    res.redirect("/supplier/home");
  } catch (error) {
    res.send(error.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    res.render("addUsers");
  } catch (error) {
    res.send(error.message);
  }
};

exports.saveUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    console.log(user.id);
    res.redirect(`/user/${user.id}/userprofile`);
  } catch (error) {
    res.send(error.message);
  }
};

exports.addUserProfile = async (req, res) => {
  try {
    res.render("addUsersProfile");
  } catch (error) {
    res.send(error.message);
  }
};

exports.saveUserProfile = async (req, res) => {
  const { id } = req.params;
  const data = Object.assign({}, req.body, { UserId: id });
  console.log(id);
  console.log(data);
  try {
    await UserProfile.create(data);
    res.redirect("/home");
  } catch (error) {
    res.send(error.message);
  }
};
