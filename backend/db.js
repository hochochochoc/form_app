const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "jannik.riegel@gmail.com",
  password: "IneedAjob123",
  database: "form_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
