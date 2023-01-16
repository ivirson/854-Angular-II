const database = require("../../../infra/db");
const User = require("../models/user.model");

class LoginRepository {
  async findByUsername(username) {
    await database.sync();
    const user = await User.findOne({
      where: {
        username
      }
    });
    return user;
  }
}

module.exports = new LoginRepository();