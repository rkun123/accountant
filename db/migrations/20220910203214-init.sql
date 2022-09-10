
-- +migrate Up
CREATE TABLE genres(
  id INTEGER NOT NULL AUTO_INCREMENT,
  title TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE accounts(
  id INTEGER NOT NULL AUTO_INCREMENT,
  genre_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR NOT NULL, 
  PRIMARY KEY (id)
);

-- +migrate Down
DROP TABLE genres, accounts, users;