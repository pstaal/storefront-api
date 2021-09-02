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

## Testing

In package.json there is a script "test" that sets up the tables in a test database via db-migrate, then tests the different models, and afterwards cleans the database again.

## Running the app

To run the app type "npm run watch" in the terminal. The Typscript will be compiled to javascript in the dist folder and your app wil run on localhost.
