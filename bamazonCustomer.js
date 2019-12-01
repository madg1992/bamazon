var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "madg1992",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //test whether the connection works
    console.log("Connected as id: " + connection.threadId);
    start();
})

var start = function () {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + " " +
                res[i].product_name + " " +
                res[i].department_name + " " +
                res[i].price + " " +
                res[i].stock_quantity + "\n"
            );
        }
        askQuestion(res);
    })
}

//need a function that ask the user to select one of these options and purchase it
var askQuestion = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Please type in the product id number you would like to order:"
    }]).then(function (answer) {
        var correct = false;
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many of this item would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quantity) + "' WHERE product_name'" + product + "'", function (err, response) {
                            console.log("You successfully bought the product!");
                            start();
                        })
                    } else {
                        console.log("Insufficient Quantity!");
                        askQuestion(res);
                    }
                })
            }
        }
    })
}

