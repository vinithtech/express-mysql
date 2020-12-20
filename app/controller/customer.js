"use strict";

var Customer = require("../model/customer");

exports.list_all_customers = function (req, res) {
  Customer.getAllCustomers(function (err, customer) {
    if (err) res.send(err);
    res.send(customer);
  });
};

exports.create_a_customer = function (req, res) {
  var new_customer = new Customer(req.body);
  //handles null error
  if (!new_customer.customer_uid || !new_customer.customer_name) {
    res
      .status(400)
      .send({ error: true, message: "Please provide customer details" });
  } else {
    Customer.createCustomer(new_customer, function (err, customer) {
      if (err) res.send(err);
      res.json(customer);
    });
  }
};

exports.read_a_customer = function (req, res) {
  Customer.getCustomerById(req.params.customerId, function (err, customer) {
    if (err) res.send(err);
    res.json(customer);
  });
};

exports.update_a_customer = function (req, res) {
  Customer.updateById(req.params.customerId, new Customer(req.body), function (
    err,
    customer
  ) {
    if (err) res.send(err);
    res.json(customer);
  });
};

exports.delete_a_customer = function (req, res) {
  Customer.remove(req.params.customerId, function (err, customer) {
    if (err) res.send(err);
    res.json({ message: "Customer successfully deleted" });
  });
};
