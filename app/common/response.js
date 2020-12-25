"use strict";

function responseStruct(res, status, code, message, data) {
  let response = {};
  response.responseCode = code;
  response.responseMessage = message;
  response.responseData = data;
  res.status(status).json(response);
}

module.exports = (function () {
  return {
    responseStruct: responseStruct
  };
})();
