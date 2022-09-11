
-- +migrate Up
ALTER TABLE genres ADD CONSTRAINT unique_genre_title UNIQUE(title);

-- +migrate Down
ALTER TABLE genres DELETE CONSTRAINT unique_genre_title;
