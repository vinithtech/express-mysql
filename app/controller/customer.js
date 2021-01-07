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
        let filter =
          req.body && req.body.filter && req.body.filter.length > 0
            ? req.body.filter
            : false;
        let rand = Date.now();
        console.log("A", filter && filter.includes("name"), "B", !filter);
        let headerArray = [];
        let headerTitles = [
          "id",
          "name",
          "proof_number",
          "proof_type",
          "phone",
          "martial",
          "address",
          "gender",
          "dob",
          "district",
          "state",
          "pincode",
          "covid_status",
          "year_of_birth",
          "location_name",
          "covid_result",
          "user_id",
          "created_name",
          "updated_by",
          "updated_name",
          "created_date",
          "updated_date",
          "dob_year",
          "age"
        ];
        headerTitles.map(h => {
          (filter && filter.includes(h)) || !filter
            ? headerArray.push({ id: h, title: h })
            : "";
        });
        const csvWriter = createCsvWriter({
          path: `app/common/files/customers/customers_list_${rand}.csv`,
          header: headerArray
        });

        let customJsonData = [...jsonData];
        customJsonData.map((k, index) => {
          if (k.dob && k.dob !== null) {
            let d = new Date(Number(k.dob));
            customJsonData[
              index
            ].dob = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
            customJsonData[index].created_date = new Date(k.created_date)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            customJsonData[index].updated_date = new Date(k.updated_date)
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            customJsonData[index].dob_year = d.getFullYear();
            let dob = new Date(
              `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
            );
            //calculate month difference from current date in time
            let month_diff = Date.now() - dob.getTime();
            //convert the calculated difference in date format
            let age_dt = new Date(month_diff);
            //extract year from date
            let year = age_dt.getUTCFullYear();
            //now calculate the age of the user
            let age = Math.abs(year - 1970);
            customJsonData[index].age = age;
          }
        });

        csvWriter
          .writeRecords(customJsonData)
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
