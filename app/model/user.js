"user strict";
var sql = require("../db.js");

//User object constructor
var User = function (user) {
  this.login = user.login;
  this.password = user.password;
};

User.validateUser = function (userData, result) {
  sql.query(
    "Select * from users where (user_email = ? OR user_name =?) and user_password = ?",
    [userData.login, userData.login, userData.password],
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res.length > 0 ? res[0] : 0);
      }
    }
  );
};

module.exports = User;
