# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

The app uses the following technologies:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Dependencies

Please make sure to install the following dependencies: bcrypt, jasmine, dotenv, node, express, jsonwebtoken, db-migrate, pg, typescript and body-parser. Also make sure to have the types for these packages installed.

## Testing

To run all the tests the user first has to set up a new database specifically for testing in postgresql, and create a user to access that database. The user can be added in the .env file in the variable POSTGRES_USER, the password for that user in variable POSTGRES_PASSWORD and the test database name in variable POSTGRES_TEST_DB. In package.json there is a script "test" that sets up the tables in a test database via db-migrate, then tests the different models, and afterwards resets the database again.

There are four tables will be created via db-migrate: users, products, orders, order_products. For the database schema please visit requirements.md.

The user also has to create a production database that is used for the app in production. make sure that the same user has access to the production database. in the .env add the name of this database to the variable POSTGRES_DB. Also make sure to change the variables TOKEN_SECRET and BCRYPT_PASSWORD.

## Running the app

To run the app type "npm run watch" in the terminal. The Typscript will be compiled to javascript in the dist folder and your app wil run on localhost.
