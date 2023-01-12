const usersRepositories = require("../repositories/users.repositories");

class UsersController {
  async findAll(req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para obter um usuário.'
    const users = await usersRepositories.findAll();

    /* #swagger.responses[404] = { 
        description: 'Usuário não encontrado.' 
    } */
    if (!users) {
      return res.status(404).json();
    }

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/User" },
        description: 'Usuário encontrado.' 
    } */
    return res.status(200).json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await usersRepositories.findOne(id);
    return res.json(user);
  }

  async create(req, res) {
    const user = req.body;
    usersRepositories.create(user);
    return res.json();
  }

  async update(req, res) {
    const user = req.body;
    const { id } = req.params;
    usersRepositories.update(id, user);
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    usersRepositories.delete(id);
    return res.json();
  }
}

module.exports = new UsersController();