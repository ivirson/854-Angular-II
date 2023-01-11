class ContactsRepository {
  constructor (conn) {
    this.db = conn;
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM contacts WHERE id = ?`, id, callback);
  }

  saveContact(contact, callback) {
    const { phone, email } = contact;
    this.db.run(
      `INSERT INTO contacts (phone, email) 
       VALUES (?, ?)`,
      [phone, email],
      callback
    );
  }

  updateContact(id, contact, callback) {
    const { phone, email } = contact;
    const sql = `UPDATE contacts SET phone = ?, email = ? WHERE id = ?`;

    this.db.run(sql, [phone, email, id], callback);
  }

  deleteContact(id, callback) {
    const sql = `DELETE FROM contacts WHERE id = ?`;

    this.db.run(sql, id, callback);
  }
}

module.exports = (conn) => new ContactsRepository(conn);