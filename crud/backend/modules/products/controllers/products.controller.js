const productsRepository = require("../repositories/products.repository");

class ProductsController {
  async findAll(req, res) {
    // #swagger.tags = ["Product"]
    // #swagger.description = "Endpoint para obter um produto."
    const products = await productsRepository.findAll();
    // #swagger.responses[200] = { 
    //   schema: { $ref: "#/models/Product" },
    //   description: "Produto encontrado." 
    // } 
    return res.json(products);
  }

  async findById(req, res) {
    const {
      id
    } = req.params;
    const user = await productsRepository.findOne(id);
    return res.json(user);
  }

  async create(req, res) {
    const user = req.body;
    productsRepository.create(user);
    return res.json();
  }

  async update(req, res) {
    const user = req.body;
    const {
      id
    } = req.params;
    productsRepository.update(id, user);
    return res.json();
  }

  async delete(req, res) {
    const {
      id
    } = req.params;
    productsRepository.delete(id);
    return res.json();
  }
}

module.exports = new ProductsController();