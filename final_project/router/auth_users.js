const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    { "username": "user1",
       "password": "pw1001"
    },
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userWithName = users.filter((user)=>{
        return user.username === username
    });
    if(userWithName.length >0){
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    const validUser = users.find(
        (user)=>user.username === username && user.password === password
    );
    return validUser;
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    return res.status(404).json({message: "Failed to log in."});
  }
  if (authenticatedUser(username,password)) {
    const accessToken = jwt.sign(
        {
            data: password,
        },
        "access",
        {
            expiresIn: 60 * 60,
        }
    );
  

  req.session.authorization = { accessToken, username};
  return res.status(200).send("User successfully logged in.");
} else {
    return res.status(208).send("Invalid username and/or password.")
}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.query.review;
  const token = req.headers.wuthorization.split(" ")[1];
  const decoded = jwt.verify(token,jwtSecret);
  const username = decoded.username;

  if (books[isbn]) {
    if (!books[isbn].reviews) {
        books[isbn].reviews = [];
    }
    books[isbn].reviews[username]=review;
    res.status(200).json({message: "Review added."});
  } else {
    res.status(404).json({message: "Book not found"});
  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
