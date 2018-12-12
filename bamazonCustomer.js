const inquirer = require('inquirer');
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log("--------Welcome to bAmazon--------\n");
  startBam();
});

function startBam(){ 
  connection.query("SELECT * FROM products");
  inquirer.prompt([
    {
      name: "dept",
      type: "list",
      message: "Select a department to purchase from.",
      choices: ["Indoor-Furniture", "Outdoor-Furniture", "Electronics", "Bathroom-Supplies", "Clothing"]
    }
  ]).then(answer => {
    if (answer.dept === "Indoor-Furniture") {
      connection.query("SELECT * FROM products WHERE ?",
      {
        department_name: "Indoor-Furniture"
      }, (err, res) => {
        if (err) throw (err);
      })
    }
  })
}