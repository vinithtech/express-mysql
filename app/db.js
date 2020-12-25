"user strict";

const config = require("../config");

var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
