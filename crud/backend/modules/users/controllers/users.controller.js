const usersRepository = require("../repositories/users.repository");
const bcrypt = require("bcryptjs");

class UsersController {
  async findAll(req, res) {
    // #swagger.tags = ["User"]
    // #swagger.description = "Endpoint para obter um usuário."
    const users = await usersRepository.findAll();

    /* #swagger.responses[404] = { 
        description: "Usuário não encontrado." 
    } */
    if (!users) {
      return res.status(404).json();
    }

    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/User" },
        description: "Usuário encontrado." 
    } */
    return res.status(200).json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await usersRepository.findOne(id);
    return res.json(user);
  }

  async create(req, res) {
    const user = req.body;
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    usersRepository.create({  ...user, password: encryptedPassword });
    return res.json();
  }

  async update(req, res) {
    const user = req.body;
    const { id } = req.params;
    usersRepository.update(id, user);
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;
    usersRepository.delete(id);
    return res.json();
  }
}

module.exports = new UsersController();