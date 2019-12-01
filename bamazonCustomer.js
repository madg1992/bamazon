var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
});

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("Connected as id: "+connection.threadId);
// })

var start = function () {
    connection.query('SELECT * FROM PRODUCTS', function (err, res) {
        if (err) throw err;
        //console.log(res);
    })
}