"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.belongsToMany(models.Product, {
        through: models.ProductSupplier,
      });
    }
  }
  Supplier.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama tidak boleh kosong" },
          notEmpty: { msg: "Nama tidak boleh kosong" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Address tidak boleh kosong" },
          notEmpty: { msg: "Address tidak boleh kosong" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number tidak boleh kosong" },
          notEmpty: { msg: "Phone Number tidak boleh kosong" },
        },
      },
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
