const { Supplier, Product, ProductSupplier } = require("../models");
exports.showMe = async (req, res) => {
  try {
    const data = await Supplier.findAll({
      include: {
        model: Product,
      },
    });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
