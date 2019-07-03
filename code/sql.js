var mysql = require('mysql');
var connection = mysql.createConnection({
    host:  process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
});

exports.handler = (event, context) => {

    var success = false;

    try
    {
        connection.query('show tables', function (error, results, fields) {
            if (error) {
                connection.destroy();
            } else {
                // connected!
                success=true;
                console.log(results);
                connection.end(function (err) { callback(err, results);});
            }
        });
    }
    finally{}

    if(success)
    {
        return {
            'statusCode': 200,
            'body': 'success!'
        };
    }
    else{
        return {
            'statusCode': 500,
            'body': 'bad things!'
        };
    }
};