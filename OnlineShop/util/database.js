const mysql = require('mysql2');
const pass = require('../pass');

const password =  require('../pass.js')

const pool = mysql.createPool({
    host: 'localhost',
    user : 'root',
    database: 'onlineshop',
    password : password
})


module.exports = pool.promise();