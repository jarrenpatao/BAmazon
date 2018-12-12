DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price INTEGER(20) NOT NULL,
  stock_quantity INTEGER(7),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Desk', 'Indoor-Furniture', 100.00, 30), ('Riser-Desk', 'Indoor-Furniture', 120.00, 40), ('Kids-Desk', 'Indoor-Furniture', 800.00, 25), ('Patio-Chair', 'Outdoor-Furniture', 200.00, 35), ('TotL-Desktop', 'Electronics', 1299.00, 10), ('Shower-Gel', 'Bathroom-Supplies', 12.00, 100), ('Phone-Charger', 'Electronics', 20.00, 200), ('Mirror', 'Indoor-Furniture', 140.00, 90), ('Mens-Shirt', 'Clothing', 10.00, 100), ('Womens-Shirt', 'Clothing', 10.00, 100)