# NodeJS API Project

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root folder with the following content:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/your_database_name
     JWT_SECRET=your_jwt_secret
     ```

4. Start the server:
   ```bash
   node index.js
   ```

   Alternatively, if you have `nodemon` installed:
   ```bash
   nodemon index.js
   ```

## API Endpoints

### Auth Routes
1. **Register User**
   - **POST** `/api/auth/register`
   - **Request Body:**
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword",
       "age": 30,
       "phone": "+32 444 44 44 44"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **Login User**
   - **POST** `/api/auth/login`
   - **Request Body:**
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "<JWT_TOKEN>",
       "message": "Login successful"
     }
     ```

### User Routes
1. **Fetch All Users**
   - **GET** `/api/users`
   - **Response:**
     ```json
     [
       {
         "_id": "userId",
         "name": "John Doe",
         "email": "john@example.com",
         "age": 30,
         "phone": "+32 444 44 44 44"
       }
     ]
     ```

2. **Fetch User by ID**
   - **GET** `/api/users/:id`

3. **Search Users**
   - **GET** `/api/users/search?name=john&email=john@example.com`

4. **Paginated Users**
   - **GET** `/api/users/paginated?limit=5&offset=10`

5. **Create User**
   - **POST** `/api/users`
   - **Request Body:** Same as the register endpoint.

6. **Update User**
   - **PUT** `/api/users/:id`

7. **Delete User**
   - **DELETE** `/api/users/:id`

### News Routes
1. **Fetch All News Posts**
   - **GET** `/api/news`

2. **Fetch News Post by ID**
   - **GET** `/api/news/:id`

3. **Search News**
   - **GET** `/api/news/search?title=breaking`

4. **Paginated News**
   - **GET** `/api/news/paginated?limit=5&offset=10`

5. **Create News Post**
   - **POST** `/api/news`

6. **Update News Post**
   - **PUT** `/api/news/:id`

7. **Delete News Post**
   - **DELETE** `/api/news/:id`

## Testing the API
- Use tools like Postman or cURL to test endpoints.
- For filtering and sorting, use query parameters in the URL bar of the browser or Postman.

## Security Improvements
- Passwords are hashed using `bcrypt` before saving.
- JWT is used for authentication, and you can include the token in the `Authorization` header for secure endpoints.

## Running the Application
Ensure MongoDB is running locally or remotely and set up the correct connection URI in `.env`. Then start the server and test the endpoints.
