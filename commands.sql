
CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author text,
	url text NOT NULL,
	title text NOT NULL,
	likes numeric DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Tom Baggins', 'React is easy', 'whatever@whatever.com');
INSERT INTO blogs (author, url, title) VALUES ('Peter Jackson', 'I got this Prostgres working', 'whatever@whatever.com');

