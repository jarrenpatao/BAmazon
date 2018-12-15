const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  startBam();
});

function startBam() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Whats the ID# for the item you would you like to buy?",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ]).then(function(val) {
      exitApp(val.choice);
      var choiceId = parseInt(val.choice);
      var product = gotIt(choiceId, inventory);
      if (product) {
        howMany(product);
      }
      else {
        console.log("\nWe don't have that.");
        startBam();
      }
    });
}

function howMany(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "exit";
        }
      }
    ]).then(function(val) {
      exitApp(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log("\nWe don't have that many!");
        startBam();
      }
      else {
        buyIt(product, quantity);
      }
    });
}

function buyIt(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "!");
      startBam();
    }
  );
}

function gotIt(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function exitApp(choice) {
  if (choice.toLowerCase() === "exit") {
    console.log("Goodbye!");
    process.exit(0);
  }
}
