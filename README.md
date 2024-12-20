# Node.js Todo API

This is a simple RESTful API built using **Node.js** and **Express** that allows you to perform CRUD (Create, Read, Update, Delete) operations on a Todo list. The API connects to a PostgreSQL database to store and retrieve todo items.

## Features

- **Create Todo** – Add a new todo with a description and completion status.
- **Get Todos** – Retrieve a list of all todos.
- **Get Todo by ID** – Retrieve a specific todo by its ID.
- **Update Todo** – Update the description and completion status of an existing todo.
- **Delete Todo** – Delete a specific todo by its ID.
- **Sample Todo** – Create a sample todo for testing purposes.

## Prerequisites

- Node.js installed on your machine.
- PostgreSQL database running and accessible.
- `dotenv` package for environment variable management.
- PostgreSQL table named `todo` with columns `id`, `text`, and `completed`.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nsolaf1/ToDo-API
cd todo-api

npm install
```

### 2. Set Up Environment Variables
```bash  .env file
DB_USER=your_pg_user
DB_HOST=localhost
DB_DATABASE=todo_db
DB_PASSWORD=your_pg_password
DB_PORT=5432
PORT=3000

```

### 3. Database Setup
```bash 
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

```

### 4. Run server
```bash
npm start
```

By default, the server will run on http://localhost:3000.

You can use tools like Postman or Insomnia to test the API endpoints. You can also use curl from the command line.