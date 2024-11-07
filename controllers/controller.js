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
