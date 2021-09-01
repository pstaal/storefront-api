CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    password VARCHAR NOT NULL
);