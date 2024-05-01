const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  const alreadyExit = (username)=>{
    let userWithName = users.filter((user)=>{
        return user.username ===username
    });
    if(userWithName.length >0){
        return true;
    } else {
        return false;
    }
  }
  
  
  if (username && password0) {
    if (!alreadyExit(username)) {
        users.push({"username":username, "password":password});
        return res.status(200).json({message: "User successfully registered."});
    } else {
        return res.status(404).json({message: "User already exists."});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let allBook = JSON.stringify(books);
  res.send(JSON.stringify(allBook));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let bookDetails = Object.values(books);
  let isbnBook = bookDetails.find(b=>b.isbn === isbn);
  res.send(JSON.stringify(isbnBook));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  bookDetails = Object.values(books);
  let authorBook = bookDetails.find(b=>b.author===author);
  res.send(JSON.stringify(authorBook));
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let bookDetails = Object.values(books);
  let titleBook = bookDetails.find(b=>b.title===title);
  res.send(JSON.stringify(titleBook));
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let bookDetails = Object.values(books);
  let reviewBook = bookDetails.find(b=>b.isbn===isbn);
  const review = reviewBook.reviews;
  res.send(review);
  
});

module.exports.general = public_users;
