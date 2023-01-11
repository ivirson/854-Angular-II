class UsersRepository {
  constructor (conn) {
    this.db = conn;
  }

  findAll(callback) {
    this.db.all(`SELECT * FROM users`, callback);
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM users WHERE id = ?`, id, callback);
  }

  findByDocumentNumber(documentNumber, callback) {
    this.db.get(`SELECT * FROM users WHERE documentNumber = ?`, documentNumber, callback);
  }

  saveUser(user, callback) {
    const { name, profession, birthDate, documentNumber } = user;
    
    this.db.run(
      `INSERT INTO users (name, profession, birthDate, documentNumber) 
      VALUES (?, ?, ?, ?)`,
      [ name, profession, birthDate, documentNumber ],
      callback
    );
    
  }

  updateUser(id, user, callback) {
    const { name, profession, birthDate, documentNumber } = user;
    const sql = `UPDATE users SET name = ?, profession = ?, birthDate = ?, documentNumber = ? WHERE id = ?`;

    this.db.run(sql, [name, profession, birthDate, documentNumber, id], callback);
  }

  deleteUser(id, callback) {
    const sql = `DELETE FROM users WHERE id = ?`;

    this.db.run(sql, id, callback);
  }
}

module.exports = (conn) => new UsersRepository(conn);