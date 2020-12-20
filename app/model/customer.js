"user strict";
var sql = require("../db.js");

//Customer object constructor
var Customer = function (customer) {
  this.customer_uid = customer.uid;
  this.customer_name = customer.name;
  this.customer_phone = customer.phone;
  this.customer_martial = customer.martial;
  this.customer_address = customer.address;
  this.customer_gender = customer.gender;
  this.customer_dob = customer.dob;
  this.customer_district = customer.district;
  this.customer_state = customer.state;
  this.customer_pincode = customer.pincode;
};

Customer.getAllCustomers = function (result) {
  sql.query("Select * from customers", function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Customer.createCustomer = function (newCustomer, result) {
  sql.query("INSERT INTO customers set ?", newCustomer, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Customer.getCustomerById = function (userId, result) {
  sql.query("Select * from customers where customer_id = ? ", userId, function (
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Customer.updateById = function (id, customer, result) {
  sql.query(
    "UPDATE customers SET ? WHERE customer_id = ?",
    [customer, id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Customer.remove = function (id, result) {
  sql.query("DELETE FROM customers WHERE customer_id = ?", [id], function (
    err,
    res
  ) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Customer;
