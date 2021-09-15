# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index GET method ('/products'): returns array of products
- Show GET method ('products/:id'): returns a singel product object
- Create [token required] POST method ('/products'): creates and returns product object
- Top 5 most popular products GET method ('/top_five_products'): returns an array of order_products
- Products by category (args: product category) GET method ('/products/category/:category'): returns an array of products objects

#### Users

- Index [token required] GET method ('/users'): returns an array of users
- Show [token required] GET method ('users/:id'): returns a single user
- Create [token required] POST method ('/users'): returns the single user that is created in the database

#### Orders

- Current Order by user (args: user id)[token required] GET method ('/currentorder/:id'): returns an order
- [OPTIONAL] Completed Orders by user (args: user id)[token required] GET method ('/completedorders/:id'): returns an array of completed orders

## Data Shapes

#### products table

(
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
category VARCHAR(64) NOT NULL
)

#### users table

(
id SERIAL PRIMARY KEY,
firstname VARCHAR(80) NOT NULL,
lastname VARCHAR(80) NOT NULL,
password VARCHAR NOT NULL
)

#### orders table

(
id SERIAL PRIMARY KEY,
product_id bigint REFERENCES products(id),
quantity INTEGER,
user_id bigint REFERENCES users(id),
status VARCHAR(15)
)

#### order_products table

(
id SERIAL PRIMARY KEY,
quantity integer,
user_id bigint REFERENCES users(id),
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
)
