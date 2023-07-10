const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  if(!username || !password) {
    return res.status(400).json({ error: 'Username and Password required...' });
  }

  if (users.find(user => user.username === username)) {
    return res.status(409).json({ error: 'Username already exists.' });
  }

  await users.push({username, password});
  
  
  return res.status(201).json({message: "User registration successful!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({books}, null, 5);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  var filtered_by_isbn = await books.filter(book => book.isbn === isbn);
  return await res.status(300).json({filtered_by_isbn});
 });
  
// Get book details based on author
public_users.get('/author/:author',async (req, res) => {
  //Write your code here
  let author = req.params.author;

  for(const key in books){
    const book = books[key];
    if(book.author === author){
      return await res.status(300).json({book});
    }
    else{
      throw new Error("Book not found");
    }
  }
  
});

// Get all books based on title
public_users.get('/title/:title',async (req, res) => {
  //Write your code here
  let title = req.params.title;

  for(const key in books){
    const book = books[key];
    if(book.title === title){
      return await res.status(300).json({book});
    }
    else{
      throw new Error("Book not found");
    }
  }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.general = public_users;
