const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

envs = dotenv.config({ path: path.join(__dirname, '../.env') })

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

module.exports = pool