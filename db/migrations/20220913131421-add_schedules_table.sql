
-- +migrate Up

CREATE TABLE IF NOT EXISTS schedules(
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT,
  day INTEGER NOT NULL,
  time TIME NOT NULL,
  amount INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- +migrate Down

DROP TABLE schedules;