# Task Manager API

A simple RESTful API for managing tasks, built with Node.js and Express.js. This project demonstrates CRUD operations, input validation, error handling, and in-memory data storage.

## Features
- Create, read, update, and delete tasks
- Input validation and error handling
- In-memory data storage
- Automated tests using Tap and Supertest

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/airtribe-projects/task-manager-api-Raghunath947.git
   
   cd task-manager-api-Raghunath947
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Server
Start the API server:
```sh
node app.js
```
The server will run on `http://localhost:3000`.

## API Endpoints

### Create a Task
- **POST** `/tasks`
- **Body:** `{ "title": string, "description": string, "completed": boolean }`
- **Response:** `201 Created` with the new task object

### Get All Tasks
- **GET** `/tasks`
- **Response:** `200 OK` with an array of tasks

### Get Task by ID
- **GET** `/tasks/:id`
- **Response:** `200 OK` with the task object, or `404 Not Found`

### Update a Task
- **PUT** `/tasks/:id`
- **Body:** `{ "title": string, "description": string, "completed": boolean }`
- **Response:** `200 OK` with the updated task, or `400/404` on error

### Delete a Task
- **DELETE** `/tasks/:id`
- **Response:** `200 OK` on success, or `404 Not Found`

## Testing
Run all automated tests:
```sh
npm run test
```
All test cases are in `test/server.test.js` and cover all endpoints and error scenarios.


