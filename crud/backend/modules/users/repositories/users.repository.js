const database = require("../../../infra/db");
const Address = require("../models/address.model");
const Contact = require("../models/contact.model");
const User = require("../models/user.model");

class UsersRepository {
  async findAll() {
    await database.sync();
    const users = await User.findAll({
      include: [{
          model: Address,
          as: "address"
        },
        {
          model: Contact,
          as: "contact"
        }
      ]
    });
    return users;
  }

  async findOne(id) {
    await database.sync();
    const user = await User.findOne({
      where: {
        id
      },
      include: [{
          model: Address,
          as: "address"
        },
        {
          model: Contact,
          as: "contact"
        }
      ]
    });
    return user;
  }

  async create(userP) {
    try {
      await database.sync();

      const {
        address,
        contact,
        ...user
      } = userP;

      const createdUser = await User.create(user);

      await Address.create({
        ...address,
        userId: createdUser.dataValues.id
      });

      await Contact.create({
        ...contact,
        userId: createdUser.dataValues.id
      });

    } catch (error) {
      console.log("Error stack:", error);
    }
  }

  async update(id, userP) {
    try {
      await database.sync();

      const {
        address,
        contact,
        ...user
      } = userP;

      const updatedUser = await User.update(
        userP, {
          where: {
            id
          }
        }
      );

      await Address.update(
        address, {
          where: {
            userId: userP.id
          }
        }
      );

      await Contact.update(
        contact, {
          where: {
            userId: userP.id
          }
        }
      );

    } catch (error) {
      console.log("Error stack:", error);
    }
  }

  async delete(id) {
    try {
      await database.sync();

      await User.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      console.log("Error stack:", error);
    }
  }
}

module.exports = new UsersRepository();