# todo-backend
## Index
-instructions to run app and tests<br>
-sample usage <br>
-file structure <br>
-api documentation<br>

## Instructions
1. Clone the app ***`git clone git@github.com:kclim1/todo-backend.git`***
2. Setup the env file inside root directory.
3. Launch the app using with docker compose up -d (optional docker logs todo-backend -f)
4. Visit /auth/google on the browser to login with google account and to receive JWT upon succesful login
Note: After logging in, all API interactions can be performed directly from the terminal using cURL commands.
5. Send API requests using curl with your valid JWT 
6. To run all test use **`npm test`** to run test suite or **`npm test path/to/test/file`** to run a specific test file.
---
## Sample Usage 
1. GET all todos
```
curl -X GET http://localhost:PORT/api/v1/todos \
-H "Authorization: Bearer <JWT>"
```
2. Create a todo 
```
curl -X POST http://localhost:PORT/api/v1/todos \
-H "Authorization: Bearer <JWT>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Sample Title",
  "description": "Sample Description"
}'
```
3. Delete a todo
```
curl -X DELETE http://localhost:PORT/api/v1/todos/:<_id> \
-H "Authorization: Bearer <JWT>"
```
4. Mark a todo as completed
```
curl -X PATCH http://localhost:PORT/api/v1/todos/:<_id> \
-H "Authorization: Bearer <JWT>" \
-H "Content-Type: application/json" \
-d '{
  "status": true
}'
```

## File Structure
```
todo-backend
├── docker-compose.yml
├── Dockerfile
├── src
│   ├── app.js                    # Main entry point
│   ├── auth
│   │   └── googleAuth.js         # Google OAuth logic
│   ├── config
│   │   └── connectToMongoDB.js   # MongoDB connection setup
│   ├── controllers
│   │   └── CRUDController.js     # CRUD operations for todos
│   ├── middleware
│   │   └── verifyJWT.js          # JWT authentication middleware
│   ├── routes
│   │   ├── authRouter.js         # Authentication routes
│   │   ├── CRUDRouter.js         # Routes for CRUD operations
│   │   └── pageRouter.js         # Static page routes (if any)
│   ├── schema
│   │   ├── Todo.js               # Todo schema (Mongoose)
│   │   └── User.js               # User schema (Mongoose)
│   └── tests                     # Test folder testing for expected behaviours
│       ├── expextedToFail        # Test folder for all expected failures 
│       ├── expectedToPass        # Test folder for all expected success


```
---
## API documentation

### Log in with Gmail
```
/auth/google
```
Method: GET (Accessed via Browser)<br>
Description:<br>
User must give consent and will be redirected back to the app, receiving a JWT upon successful authentication. Access this endpoint using the browser.

---
Upon succesful login, a google user object will be returned.
```
{
  googleId: '123456788900123',
  email: 'sample@gmail.com',
  userName: 'JOHN DOE',
  token: 'SAMPLE_TOKEN_WITH_RANDOM_LOOKING_ALPHABETS_DIGITS'
}
```

### Create a Todo
```
/api/v1/todos
```
Method: POST

### Description: <br>
Creates a new Todo item in the database.

### Sample cURL command
```
curl -X POST http://localhost:3000/api/v1/todos \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
-d '{
  "title": "Buy groceries",
  "description": "Remember to buy milk and eggs"
}
```
### Request Body
```
{
  "title": "string (required)",
  "description": "string (optional)"
}
```
### Success Response
Response: 201 Created
```
{
  "success": true,
  "message": "Todo created successfully.",
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
Response : 500 Failed
```
{
  "message": "Error creating to-do."
}
```
---

### View All Todos
```
/api/v1/todos
```
Method: GET

Description: <br>
Retrieves a list of all Todo items in the system.

### Sample cURL command
```
curl http://localhost:3000/api/v1/todos \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```
Response: 200 OK

```
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```
Response : 500 Error
```
{
  "message": "Error retrieving todos."
}
```

---

### Delete a Todo
```
/api/v1/todos/:id
```
Method: DELETE

Description:
Deletes a specific Todo item identified by its ID.
###  Sample cURL command
```
curl -X DELETE http://localhost:3000/api/v1/todos/:id \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

Path Parameter:

/ :id - The unique identifier of the Todo item to be deleted.

Response: (200 OK)
```
{
  "message": "To-Do successfully deleted."
}
```
Error Response:

500 Internal Server Error:
```
{
  "message": "Error deleting to-do."
}
```
---

### Update Todo Status
```
/api/v1/todos/:id
```
Method: PATCH

Description:
Updates the status of a specific Todo item identified by its ID.

### Sample  cURL command
```
curl -X PATCH http://localhost:3000/api/v1/todos/:id \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
-d '{
  "status": "completed"
}'
```

Path Parameter:

:id - The unique identifier of the Todo item to be updated.

Request Body: (JSON)
```
{
  "status": "string (required, e.g., 'completed', 'pending')"
}
```
Response: 200 OK
```
{
  "message": "To-Do status updated successfully.",
  "todo": {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
Error Response:

500 Internal Server Error:
```
{
  "message": "Error updating to-do status."
}
```
---

