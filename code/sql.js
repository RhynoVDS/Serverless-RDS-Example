var mysql = require('mysql');
var con = mysql.createConnection({
    host:  process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
});
exports.setup = (event, context, callback) => {
    
    console.log("Connected!");
    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {

        if (err) throw err;

        var response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }

        con.end();
        callback(err,response)
    });
};

exports.query = (event, context, callback) => {

    con.query("SELECT * FROM customers", function (err, result, fields) {

        console.log(result);
        var response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }

        con.end();
        callback(err,JSON.stringify(response))
    });
}

exports.insert = (event, context, callback) => {
    con.connect(function(err) {
        
        var sql = "INSERT INTO customers (name, address) VALUES ('" + event.body.name + "','" + event.body.address+ "')"
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            var response = {
                statusCode: 200,
                body: JSON.stringify(result)
            }
            con.end();
            callback(err,response);
        });
    });
}