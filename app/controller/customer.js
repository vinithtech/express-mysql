"use strict";

let responseCommon = require("../common/response");

var Customer = require("../model/customer");

exports.list_all_customers = function (req, res) {
  Customer.getAllCustomers(req, function (err, customer) {
    if (err) {
      responseCommon.responseStruct(
        res,
        417,
        417,
        err.sqlMessage,
        err.sqlMessage
      );
    } else {
      let cusotmerResult = {
        customerList: customer,
        totalRecords: customer["total"]
      };
      responseCommon.responseStruct(
        res,
        200,
        200,
        "List of Customers",
        cusotmerResult
      );
    }
  });
};

exports.create_a_customer = function (req, res) {
  var new_customer = new Customer(req.body);
  //handles null error
  if (!new_customer.customer_proof_number) {
    responseCommon.responseStruct(
      res,
      417,
      417,
      "Please provide require details",
      {}
    );
  } else {
    Customer.createCustomer(new_customer, function (err, customer) {
      if (err) {
        responseCommon.responseStruct(
          res,
          417,
          417,
          err.sqlMessage,
          err.sqlMessage
        );
      } else {
        responseCommon.responseStruct(
          res,
          200,
          200,
          "Customer Details Saved Successfully",
          { customerID: customer }
        );
      }
    });
  }
};

exports.read_a_customer = function (req, res) {
  Customer.getCustomerById(req.params.customerId, function (err, customer) {
    if (err) {
      responseCommon.responseStruct(
        res,
        417,
        417,
        err.sqlMessage,
        err.sqlMessage
      );
    } else {
      responseCommon.responseStruct(
        res,
        200,
        200,
        "Customer Details",
        customer
      );
    }
  });
};

exports.update_a_customer = function (req, res) {
  Customer.updateById(req.params.customerId, new Customer(req.body), function (
    err,
    customer
  ) {
    if (err) {
      responseCommon.responseStruct(
        res,
        417,
        417,
        err.sqlMessage,
        err.sqlMessage
      );
    } else {
      if (customer === 0) {
        responseCommon.responseStruct(
          res,
          417,
          417,
          "Update Failed",
          "Update Failed"
        );
      } else {
        responseCommon.responseStruct(
          res,
          200,
          200,
          "Customer successfully updated",
          {}
        );
      }
    }
  });
};

exports.delete_a_customer = function (req, res) {
  Customer.remove(req.params.customerId, function (err, customer) {
    if (err) {
      responseCommon.responseStruct(
        res,
        417,
        417,
        err.sqlMessage,
        err.sqlMessage
      );
    } else {
      if (customer === 0) {
        responseCommon.responseStruct(
          res,
          404,
          404,
          "Customer Not Found",
          "Customer Not Found"
        );
      } else {
        responseCommon.responseStruct(
          res,
          200,
          200,
          "Customer successfully deleted",
          {}
        );
      }
    }
  });
};

exports.search_customer = function (req, res) {
  Customer.getCustomerBySearchTerm(req.params.term, function (err, customer) {
    if (err) {
      responseCommon.responseStruct(
        res,
        417,
        417,
        err.sqlMessage,
        err.sqlMessage
      );
    } else {
      responseCommon.responseStruct(
        res,
        200,
        200,
        `Customer Lists by ${req.params.term}`,
        customer.length > 0 ? customer : "No Records"
      );
    }
  });
};
