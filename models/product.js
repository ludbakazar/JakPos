"use strict";
const { Model, where, Op, fn, col } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Supplier, {
        through: models.ProductSupplier,
      });
    }
    static async getProduct(keyword, Supplier) {
      const option = {
        include: {
          model: Supplier,
        },
        where: {},
      };

      if (keyword) {
        option.where.name = {
          [Op.iLike]: `%${keyword}%`,
        };
      }

      return await Product.findAll(option);
    }

    static async summary() {
      return Product.findOne({
        raw: true,
        attributes: [
          [fn("count", col("qty")), "totalProduct"],
          [fn("sum", col("purchasePrice")), "totalHargaBeli"],
        ],
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      purchasePrice: DataTypes.INTEGER,
      sellingPrice: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
