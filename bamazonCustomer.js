const divider = "*---------------------------------*"
const conTable = require('console.table')
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
  startStore();  
});

function startStore(){
  connection.query("SELECT * FROM products", (err, res) => {
    console.table(res);
    startBam();
  })
}

function startBam(){ 
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "Select a department to purchase from.",
      choices: ["Indoor-Furniture", "Outdoor-Furniture", "Electronics", "Bathroom-Supplies", "Clothing", "Exit"]
    }
  ])
  .then((answer) => {
    // console.log(answer)
    switch (answer.dept) {
    case "Indoor-Furniture":
      ifSearch();
      var choiceIndex = "SELECT item_id,product_name,price FROM bamazon WHERE ?";
      connection.query(choiceIndex,
      {
        department_name: "Indoor-Furniture"
      }, (err, res) => {
        if (err) throw (err);
        console.log(divider);
        console.table(res);
        console.log(divider);
      })

    break;

    case "Outside-Furniture":
      ofSearch();
      break;

    case "Electronics":
      elecSearch();
      break;

    case "Bathroom-Supplies":
      bsSearch();
      break;

    case "Clothing":
      clothingSearch();
      break;
    
    case "Exit":
      connection.end();  
      break;  
    }    
  });
  
function ifSearch() {
  inquirer
    .prompt({
      name: "indoor",
      message: "Which is the item_id of the item you would like to view?",
      type: "input"
    })
    .then((answer) => {
      
    })
  }
}
//   .then(answer => {
//     console.log(answer)
    // if (answer.dept === "Indoor-Furniture") {
    //   console.log(divider)
    //   connection.query("SELECT item_id, product_name, price FROM products WHERE ?", (err, res) => {
    //     if (err) throw (err);
    //     console.log(res);
    //     console.log(divider);
    //   })
    //   connection.end();
    // }
//   })
// }