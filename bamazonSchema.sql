CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INTEGER(15) NOT NULL
PRIMARY KEY (item_id)
);

