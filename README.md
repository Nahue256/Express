# Cursor Backend challenge

REST API build with Node.js and Express.js using cursor

### Features

- Create new Users
- Get Users list
- Get User by ID
- Update User
- Delete User

## Pre-requisites
- Docker installed
- Docker compose installed
- Ports free: 3000 and 5432

## How to run the APP

```
chmod 711 ./up_dev.sh
./up_dev.sh
```

## How to run the tests

```
chmod 711 ./up_test.sh
./up_test.sh
```

## Areas to improve

- Data should be moved from tests to an external file
- Error handling could be improved.
- A Seed migration would be useful to have an already working app with data.
- The ORM is being used with Sinchronize instead of Migrations.
- Deployment could be done.

## Errors to be fixed

## Technologies used

- Node.js: 22.14.0
- Express.js: 4.18.2
- PostgreSQL
- TypeORM
- Docker

## Decisions made

- Clean Architecture: To be able to handle future changes in the future in a proper way.
- TypeORM: Because it is the most popular ORM so it is easy to find fixes and people that know how to use it.
- Docker: To make it portable
- Testing: Used Jest because is the most popular testing framework of JS. E2E Testing with a DB for testing was done because it is a good practice.

## Route

- API: http://localhost:3000/api
- API Swagger: http://localhost:3000/api-docs

# Env vars should be defined

To find an example of the values you can use .env.example