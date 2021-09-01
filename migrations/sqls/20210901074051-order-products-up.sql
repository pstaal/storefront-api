CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    user_id bigint REFERENCES users(id),
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);