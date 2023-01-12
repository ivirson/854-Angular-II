const database = require("../../../infra/db");
const Product = require("../models/product.model");

class ProductsRepository {
  async findAll() {
    await database.sync();
    const products = await Product.findAll();
    return products;
  }

  async findOne(id) {
    await database.sync();
    const product = await Product.findOne({
      where: {
        id
      }
    });
    return product;
  }

  async create(product) {
    try {
      await database.sync();
      const createdProduct = await Product.create(product);
      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, product) {
    try {
      await database.sync();
      const updatedProduct = await Product.update(
        product, {
          where: {
            id
          }
        }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      await database.sync();

      await Product.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductsRepository();