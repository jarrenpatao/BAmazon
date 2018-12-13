const divider = "*---------------------------------*"
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

// let itemId = 
//   connection.query("SELECT item_id,product_name,price WHERE ?", 
//   {
//     item_id: itemId
//   }, (err) => {

//   })

function startBam(){ 
  inquirer.prompt([
    {
      name: "dept",
      type: "rawlist",
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
        console.log(res);
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
      message: "Which is the item_id of the item you would like to view?"
    })
    .then((answer) => {
      let queryIndoor = "SELECT item_id, product_name FROM products WHERE department_name Indoor-Furniture";
      connection.query(queryIndoor, function(err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].product_name);
          console.log(divider);
        }
        startBam();
      });
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