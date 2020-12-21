"use strict";

var User = require("../model/user");

exports.validate_user = function (req, res) {
  var user_validate = new User(req.body);
  //handles null error
  if (
    user_validate.login != "" &&
    user_validate.login != undefined &&
    user_validate.password != "" &&
    user_validate.password != undefined
  ) {
    User.validateUser(req.body, function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  } else {
    res.status(400).send({ error: true, message: "Invalid User" });
  }
};
