const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user : 'root',
    database: 'onlineshop',
    password : '9kr1m@mysql'
})


module.exports = pool.promise();