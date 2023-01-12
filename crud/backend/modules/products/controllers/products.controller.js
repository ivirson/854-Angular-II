const productsRepositories = require("../repositories/products.repositories");

class ProductsController {
  async findAll(req, res) {
    // #swagger.tags = ['Product']
    // #swagger.description = 'Endpoint para obter um produto.'
    const products = await productsRepositories.findAll();
    // #swagger.responses[200] = { 
    //   schema: { $ref: "#/models/Product" },
    //   description: 'Produto encontrado.' 
    // } 
    return res.json(products);
  }

  async findById(req, res) {
    const {
      id
    } = req.params;
    const user = await productsRepositories.findOne(id);
    return res.json(user);
  }

  async create(req, res) {
    const user = req.body;
    productsRepositories.create(user);
    return res.json();
  }

  async update(req, res) {
    const user = req.body;
    const {
      id
    } = req.params;
    productsRepositories.update(id, user);
    return res.json();
  }

  async delete(req, res) {
    const {
      id
    } = req.params;
    productsRepositories.delete(id);
    return res.json();
  }
}

module.exports = new ProductsController();