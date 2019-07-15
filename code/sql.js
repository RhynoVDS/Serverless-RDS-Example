var mysql = require('mysql');
function GetConnection()
{
    var con = mysql.createConnection({
        host:  process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD, 
        database: process.env.DATABASE
    });

    return con;
}

exports.setup = (event, context, callback) => {
    var con = GetConnection();
    
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
    var con = GetConnection();

    con.query("SELECT * FROM customers", function (err, result, fields) {
        
        console.log(result);
        var response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }

        callback(err,response);
        con.end();
    });
}
exports.insert = (event, context, callback) => {
    var con = GetConnection();
    event.body = JSON.parse(event.body);  

    var sql = "INSERT INTO customers (name, address) VALUES ('" + event.body.name + "','" + event.body.address+ "')"

    con.query(sql, function (err, result, fields) {
        if (err) throw err;

        var response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }
        con.end();
        callback(err,response);
    });
}