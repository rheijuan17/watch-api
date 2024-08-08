## Watch API

A RESTful API for CRUD functions for a watch catalog

## Local Setup

# Install Dependencies
```bash
$ npm install
```

# Setup .env file

A .env file is already provided for local development. Add/ Replace according to use case

# Setup Prisma ORM
```bash
$ npx prisma migrate dev

$ npx prisma generate
```

An empty .db file is provided in this project. If you want to connect to the database to perform queries, install sqlite3 and run this script

```bash
$ sqlite3 prisma\dev.db
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API Documentation

Run the application first. Open your browser and you should see the API docs in the URL below
```bash
http://localhost:3000/api-docs
```