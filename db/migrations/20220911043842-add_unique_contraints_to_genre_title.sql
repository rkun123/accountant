
-- +migrate Up
ALTER TABLE genres ADD CONSTRAINT unique_genre_title UNIQUE(title);

-- +migrate Down
ALTER TABLE genres DROP INDEX unique_genre_title;
