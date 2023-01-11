const conn = require('../infra/db-connection')('infra/database.db');
const addressesRepository = require('../repositories/users/addresses.repository')(conn);
const contactsRespository = require('../repositories/users/contacts.respository')(conn);
const usersRepository = require('../repositories/users/users.repository')(conn);

class UsersController {
  getUsers(req, res) {
    usersRepository.findAll((err, rows) => {
      if (err) {
        return res.json({
          message: "Houve um erro ao consultar os dados",
          err
        });
      }

      return res.json(rows);
    })
  }

  getUserById(req, res) {
    const { id } = req.params;
    usersRepository.findById(id, (err, user) => {
      if (err) {
        return res.json({
          message: "Houve um erro ao consultar os dados",
          err
        });
      }

      addressesRepository.findById(user.addressId, (err, address) => {
        if (err) {
          return res.json({
            message: "Houve um erro ao consultar os dados de endereço",
            err
          });
        }

        user.address = address;

        contactsRespository.findById(user.contactId, (err, contact) => {
          if (err) {
            return res.json({
              message: "Houve um erro ao consultar os dadosde contato",
              err
            });
          }

          user.contact = contact
          
          return res.json(user);
        })
      })
    })
  }

  saveUser(req, res) {
    const { address, contact, ...user } = req.body;
    usersRepository.saveUser(user, (err) => {
      if (err) {
        return res.json({
          message: "Houve um erro ao gravar os dados do usuário",
          err
        });
      }

      return res.json({ message: 'Dados cadastrados com sucesso!'});
    })
  }

  updateUser(req, res) {
    const user = req.body;
    const { id } = req.params;
    usersRepository.updateUser(id, user, (err) => {
      if (err) {
        return res.json({
          message: "Houve um erro ao atualizar os dados",
          err
        });
      }

      return res.json({ message: 'Dados atualizados com sucesso!'});
    })
  }

  deleteUser(req, res) {
    const { id } = req.params;
    usersRepository.deleteUser(id, (err) => {
      if (err) {
        return res.json({
          message: "Houve um erro ao excluir os dados",
          err
        });
      }

      return res.json({ message: 'Dados excluídos com sucesso!'});
    })
  }
}

module.exports = new UsersController();