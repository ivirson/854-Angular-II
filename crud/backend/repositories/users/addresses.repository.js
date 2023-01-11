class AddressesRepository {
  constructor (conn) {
    this.db = conn;
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM addresses WHERE id = ?`, id, callback);
  }

  saveAddress(address, callback) {
    const { zipCode, street, number, complement, neighborhood, city, state } = address;
    this.db.run(
      `INSERT INTO addresses (zipCode, street, number, complement, neighborhood, city, state) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [zipCode, street, number, complement, neighborhood, city, state],
      callback
    );
  }

  updateAddress(id, address, callback) {
    const { zipCode, street, number, complement, neighborhood, city, state } = address;
    const sql = `UPDATE addresses SET zipCode = ?, street = ?, number = ?, complement = ?, neighborhood = ?, city = ?, state = ? WHERE id = ?`;

    this.db.run(sql, [zipCode, street, number, complement, neighborhood, city, state, id], callback);
  }

  deleteAddress(id, callback) {
    const sql = `DELETE FROM addresses WHERE id = ?`;

    this.db.run(sql, id, callback);
  }
}

module.exports = (conn) => new AddressesRepository(conn);