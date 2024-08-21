# User Management API

This is a simple User Management API built using Node.js, Express, and MongoDB. It provides basic functionalities such as registering users, logging in, updating user details, retrieving all users, and deleting users. The API also includes JWT-based authentication.

## Features

- User Registration
- User Login
- JWT Authentication
- CRUD Operations (Create, Read, Update, Delete)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcrypt.js for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm (v6 or higher)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Belllum/Node-Login
   cd Node-Login
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3001
   ```
4. **Start the Server:**
   ```bash
   npm run dev
   ```
   The server should be running on http://localhost:3001.

## API Endpoints

1. **Register a New User**

   - Method: POST
   - URL: http://localhost:3001/register
   - Body:

   ```bash
      {
   "first_name": "John",
   "last_name": "Doe",
   "email": "johndoe@example.com",
   "password": "password123"
      }
   ```

2. **Login a User**

   - Method: POST
   - URL: http://localhost:3001/login
   - Body:

   ```bash
      {
   "email": "johndoe@example.com",
   "password": "password123"
      }
   ```

   - Response:
     - A JWT token will be returned on successful login.

3. **Get All Users**

   - Method: GET
   - URL: http://localhost:3001/getUsers

4. **Update a User**

   - Method: PUT
   - URL: http://localhost:3001/updateUser/<USER_ID>
   - Body:
     ```bash
        {
     "first_name": "Jane",
     "last_name": "Doe",
     "email": "janedoe@example.com",
     "password": "newpassword123",
     "status": false
        }
     ```

5. **Get All Users**

   - Method: GET
   - URL: http://localhost:3001/deleteUser/<USER_ID>

## Running Tests

```bash
    npm run test
```
