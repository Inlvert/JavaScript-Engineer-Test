# Full-Stack React and Node.js Application 'JavaScript Engineer Test'

## Description
This project is a full-stack web application built with React.js on the frontend and Node.js with Express on the backend. The application uses MongoDB as its database to store and manage data effectively.

## Features
- CRUD (Create, Read, Update, Delete) operations for data management
- Responsive and modern UI built with React
- MongoDB for data persistence

## Technologies Used
- **Frontend**: React, Reduxjs/toolkit, Axios, React-Route-Dom, Formik, SCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Requirements
To run this project on your machine, you need:
- Node.js (version 20.18.0 or higher)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Inlvert/JavaScript-Engineer-Test.git
   ```
2. Navigate to the project directory:
   ```bash
   cd JavaScript-Engineer-Test
   ```
3. Install dependencies for the frontend:
   ```bash
   cd client
   npm install
   ```
4. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```

## Configuration
- Create a `.env` file in the `server` directory and add the following environment variables(use .env.example):
  ```plaintext
  PORT=5000
  DB_UR=your_mongodb_connection_string
  ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
2. Start the frontend application:
   ```bash
   cd client
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the provided UI to perform actions such as creating, viewing, updating, and deleting records.
