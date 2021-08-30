CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(80) NOT NULL,
    lastName VARCHAR(80) NOT NULL,
    password VARCHAR NOT NULL
);