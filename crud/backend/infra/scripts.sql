DROP TABLE IF EXISTS addresses;

CREATE TABLE addresses (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	zipCode TEXT NOT NULL,
	street TEXT NOT NULL,
	number INTEGER NOT NULL,
	complement TEXT,
	neighborhood TEXT NOT NULL,
	city TEXT NOT NULL,
	state TEXT NOT NULL
);

INSERT INTO addresses (zipCode, street, number, complement, neighborhood, city, state)
VALUES ('42800049', 'Rua Costa Pinto', 54, null, 'Centro', 'Camaçari', 'BA');

DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	phone TEXT NOT NULL,
	email TEXT NOT NULL	
);

INSERT INTO contacts (phone, email)
VALUES ('11984576548', 'fulano@email.com');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
	profession TEXT NOT NULL,
	birthDate DATE NOT NULL,
	documentNumber TEXT NOT NULL UNIQUE
	-- addressId INTEGER,
	-- contactId INTEGER
	-- FOREIGN KEY (addressId) 
	-- 	REFERENCES addresses(id)
	-- 		ON UPDATE CASCADE 
  --     ON DELETE CASCADE,
	-- FOREIGN KEY (contactId) 
	-- 	REFERENCES contacts(id)
	-- 		ON UPDATE CASCADE 
  --     ON DELETE CASCADE
);

INSERT INTO users (name, profession, birthDate, documentNumber) 
VALUES ('Ivirson Daltro', 'Front-End Dev', '1988-02-15', '01234567890');

SELECT * FROM addresses;
SELECT * FROM contacts;
SELECT * FROM users;