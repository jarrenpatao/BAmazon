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
VALUES ('Desk', 'Indoor-Furniture', 100.00, 10), ('Riser-Desk', 'Indoor-Furniture', 120.00, 10), ('Kids-Desk', 'Indoor-Furniture', 800.00, 10)

UPDATE products;
SET product_name = "Corner-Desk";