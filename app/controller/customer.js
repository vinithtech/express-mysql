"use strict";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let responseCommon = require("../common/response");
const config = require("../../config");
var Customer = require("../model/customer");

exports.list_all_customers = function (req, res) {
  var customers_list = req.body;
  if (!customers_list.user_id || !customers_list.user_type) {
    responseCommon.responseStruct(
      res,
      417,
      417,
      "Please provide require details",
      {}
    );
  } else {
    Customer.getAllCustomers(req.body, function (err, customer) {
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
  }
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

exports.generate_customers = function (req, res) {
  var customers_list = req.body;
  if (!customers_list.user_id || !customers_list.user_type) {
    responseCommon.responseStruct(
      res,
      417,
      417,
      "Please provide require details",
      {}
    );
  } else {
    Customer.getAllCustomers(req.body, function (err, customer) {
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
        const jsonData = JSON.parse(
          JSON.stringify(cusotmerResult.customerList)
        );
        let rand = Date.now();
        const csvWriter = createCsvWriter({
          path: `app/common/files/customers/customers_list_${rand}.csv`,
          header: [
            { id: "id", title: "id" },
            { id: "name", title: "name" },
            { id: "proof_number", title: "proof_number" },
            { id: "proof_type", title: "proof_type" },
            { id: "phone", title: "phone" },
            { id: "martial", title: "martial" },
            { id: "address", title: "address" },
            { id: "gender", title: "gender" },
            { id: "dob", title: "dob" },
            { id: "district", title: "district" },
            { id: "state", title: "state" },
            { id: "pincode", title: "pincode" },
            { id: "covid_status", title: "covid_status" },
            { id: "year_of_birth", title: "year_of_birth" },
            { id: "location_name", title: "location_name" },
            { id: "covid_result", title: "covid_result" },
            { id: "user_id", title: "user_id" },
            { id: "updated_by", title: "updated_by" }
          ]
        });

        csvWriter
          .writeRecords(jsonData)
          .then(() =>
            responseCommon.responseStruct(res, 200, 200, "Generate Customers", {
              file: `${config.base_doman}/customer/download/customers_list_${rand}.csv`
            })
          )
          .catch(err =>
            responseCommon.responseStruct(
              res,
              417,
              417,
              "Generate Failed",
              "Generate Failed"
            )
          );
      }
    });
  }
};

exports.download_customer = function (req, res) {
  res.download(`app/common/files/customers/${req.params.file}`);
};
