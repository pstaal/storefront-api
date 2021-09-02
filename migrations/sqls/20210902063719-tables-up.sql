CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(64) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity INTEGER,
    user_id bigint REFERENCES users(id),
    status VARCHAR(15)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    user_id bigint REFERENCES users(id),
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

