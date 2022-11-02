
-- +migrate Up

CREATE TABLE tags(
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT,
    PRIMARY KEY (id)
);

-- +migrate Down

DROP TABLE tags;
