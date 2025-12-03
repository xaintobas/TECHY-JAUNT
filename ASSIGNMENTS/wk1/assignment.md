# TechyJaunt Backend Development Training Repository

Welcome to my **Backend Development Training** repository for the **TechyJaunt Bootcamp**! 🎉

This repository contains all my **assignments** throughout the training program.

# Section A — Intro to Backend (Theory: 12 Questions)

## What is backend development and how is it different from frontend development?

Backend development is the process of creating the part of a website or app that the users does not see. It involves handling the logic, database, server and API that make the app or website to function properly. While frontend development is the process of creating the part of an app or website that the users interacts with, like the image, buttons, texts etc.

## Mention three backend programming languages.

Python, PHP, JavaScript

## What is a server? Explain its role in backend development.

A server can be defined as a computer or system that receives requests from users and processes them to give back responses. This server is what runs the backend code, handles the logic of a website or app, communicates to the database and sends data to the frontend.

## Define an API and explain its purpose.

API can be defined as Application Programming Interface. It is a means of communication between two or more softwares. It allows the frontend to request data from the backend.

## What is a database and why is it important in backend systems?

A database is a collection of information. It stores several information like users, payments, etc. It is very important in backend system because every backend system needs a way of storing information and this can be achieved using a database.

## List two differences between SQL and NoSQL databases.

SQL uses table structure to store data while NoSQL does not.
SQL uses fixed schemas while NoSQL does not.

## What is a backend framework? Mention one example.

Backend framework is a tool that is built to help in the process of creating backend app or website. For example Express.JS.

## Explain what HTTP is and why it is important.

HTTP means Hypertext Transfer Protocol. This defines a standard way by which files are transferred between the server and browser. It defines how information are requested and delivered on the internet.

## Mention two responsibilities of a backend developer.

It is the responsibility of a backend developer to create API
It is the responsibility of a backend developer to manage the database of a website or app.

## What does CRUD stand for? Explain each word.

The word CRUD stands for Create, Read, Update and Delete.
Create - To create new data, like when you insert a new data into a database
Read - To retrieve data from a database.
Update - To update the data in a database like changing a user email address.
Delete - To remove information from a database. Like to delete a user account.

## What is authentication and why is it important for backend applications?

Authentication is the process of verifying a user’s identity. It is important because it helps to protect user data from unauthorized access.
What is the difference between a GET request and a POST request?
GET request is used to retrieve an information
POST is used to submit an information

# Section B — JavaScript Variables & Datatypes (Theory: 10 Questions)

## What is a variable in JavaScript?

Variable can be defined as a storage space where data can be stored. For instance, you can store user data like “name” into a variable.

## List the three ways to declare variables in JavaScript.

In JavaScript you can store data using var, let and const.

## Explain the difference between let and const.

The “let” method of declaring a variable allows you to update or change the value that the variable holds while the “const” method does not allow you to change or update the value that the variable holds. Variables declared with “const” are constant.

## Mention the seven primitive datatypes in JavaScript.

Boolean, String, Number, Null, Symbol, BigInt and Underfined

## What datatype is assigned to the value: true?

Boolean datatype

## What datatype is a JavaScript array?

Arrays are Object datatype

## Give one example of a string in JavaScript.

An example of string in JavaScrip is - let name = “Stephen”

## Give one example of a number in JavaScript

An example of number in JavaScript is - let num = 12

## What will be the output of this expression? typeof "123"

The output will be String, because the typeof helps you get the data type and since the values are in quotes, it will return string.

## Explain the difference between null and undefined.

Null is when a value is not set (let name = null) while undefined is when the value is not assigned to a variable (let name;) .

# Section C — Coding Questions (8 Questions)

## Declare a variable using let and assign your name to it.

```js
let name = “Stephen”;
```

## Write JavaScript code to add two numbers and log the result.

```js
let num1 = 3;
let num2 = 5;
let sum = num1 + num2;
console.log(sum);
```

## Create an object called student with properties: name, age, and department.

```js
let student = {name: “Stephen”, age: 10, department: “Backend Development”}
```

## Write a JavaScript function called greet() that prints "Hello World".

```js
function greet() {
  console.log(“Hello World”)
}
```

## Write a program that checks if a number is even or odd.

```js
  function checkEvenOdd(number) {
    if(number % 2 === 0) {
      console.log(“Number is even”);
    }else {
      console.log(“Number is odd”);
    }
  }
```

## Create an array of 5 colors and print the first color.

```js
const arrayOfColor = [“RED”, ”GREEN”, ”BLACK”, ”BLUE”, ”YELLOW”];
console.log(arrayOfColor[0]);
```

## Write a function that returns the square of a number passed into it.

```js
function squareNumber(number) {
  return number * number;
}
```

## Write a small code snippet that converts a string to a number:

```js
let value = "42";
let number = Number(value);
```
