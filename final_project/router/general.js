const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  if(!username || !password) {
    return res.status(404).send({message: "User cannot be registered."});
  }
  const existUser =users.find(user=>user.username==username);
  if(existUser) {
    return res.status(403).send({message: "User already exist."});
  }
  users.push({username,password});
  res.status(200).send({message: "User successfully registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //let allBook = JSON.stringify(books);
  res.send(JSON.stringify(books));
  
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
