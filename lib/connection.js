var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root-password',
    multipleStatements: true,
});

connection.connect(function(err, response) {
    if(err){
        return err
     } else {
        return response
    }
});

module.exports = connection;