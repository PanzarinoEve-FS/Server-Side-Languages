# **Server-Side-Languages**

**Commits**
- Initial Commit
- Create myModule.js
- Node Modules
- 1.4 - Let's Code NodeJS
- Async / Await Discussion

## **Videos**
 **1.5** [![Watch on YouTube](https://img.shields.io/badge/Watch_on_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=TA8HLuD27uc)
 
**1.7** [![Watch on YouTube](https://img.shields.io/badge/Watch_on_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=iOBZa2rXwwk)

## **Directory**

### **Root**
- /promiseChain.js
- /pokemon.js
### **Jest Tests**
- /tests/math.js
- /tests/math.test.js
- /tests/string.js
- /tests/string.test.js
- /tests/users.test.js
### **Models**
- /models/users.js
### **Data**
- /data/users.json
### **Routes**
- /routes/books.js
- /routes/index.js
### **Node Modules**
- /node_modules
### **Environment Files**
- /server.js
- /.env
- /.gitignore
- /package.json
- /package-lock.json
### **Documentation**
- /README.md **(That's me!)**

## Routes

### **Books Router**
/routes/books.js
the 5 CRUD methods for books
1. Get: GET localhost:3000/books - gets all books
2. Get by ID: GET localhost:3000/books/{bookid#} - gets book by id
3. Post: POST localhost:3000/books - Body raw JSON { "bookname": "dune", "author": "Frank Herbert" } - Post new book
4. Put by ID: PUT localhost:3000/books/{bookid#} - Edit by ID Body raw JSON
5. Delete by ID: DELETE localhost:3000/books/{bookid#} - Deletes book by id

### **Users Router**
/routes/index.js
the 5 CRUD methods for /model/users.js
1. Get: GET localhost:3000/users - gets all users
2. Get by ID: GET localhost:3000/users/{userid#} - gets user by id
3. Post: POST localhost:3000/users - Post Body raw JSON { "id": "1", "name": "Steve" } - Post new user
4. Put by ID: PUT localhost:3000/users/{userid#} - Edit ID Body raw JSON
5. Delete by ID: DELETE localhost:3000/users/{userid#} - deletes user by id
