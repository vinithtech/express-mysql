"use strict";

var User = require("../model/user");
let responseCommon = require("../common/response");

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
      if (err) {
        responseCommon.responseStruct(
          res,
          417,
          417,
          err.sqlMessage,
          err.sqlMessage
        );
      } else {
        if (user === 0) {
          responseCommon.responseStruct(res, 417, 417, "Login Failed", {});
        } else {
          responseCommon.responseStruct(
            res,
            200,
            200,
            "Login Successfully",
            user
          );
        }
      }
    });
  } else {
    res
      .status(400)
      .send({ error: true, message: "Please provide login details" });
  }
};
