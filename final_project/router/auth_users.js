const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let usernameInDb = users.find(user => user.username === username);

  if(!usernameInDb){
    throw new Exception(`Username ${username} is invalid!`);
  }
  else{
    return true;
}
  
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let userInDb = users.find(user => user.username === username && user.password === password);

  if(!userInDb){
    throw new Exception(`User does not exist!`);
  }
  else{
    return true;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  if(!username || !password){
    return res.status(404).json({message: "Username and Password required..."})
  }

  authenticatedUser(username, password);

  let accessToken = jwt.sign({
      data: username
  }, 'access', {expiresIn: 60 * 60});

  req.session.authorization = {
    accessToken
  }

  return res.status(200).json({message: "User successfully logged in..."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
