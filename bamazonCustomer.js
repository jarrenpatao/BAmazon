require("dotenv").config();
const inquirer = require('inquirer');
const fs = require("fs");
const keys = require('./keys.js');
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: bamazon,
  database: "bamazon"
});