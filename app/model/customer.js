"user strict";

var sql = require("../db.js");

const constant = require("../../constant");

var aliasFields = `customer_id as id, customer_name as name, customer_proof_number as proof_number, customer_proof_type as proof_type,
customer_name as name, customer_phone as phone, customer_martial as martial, customer_address as address, customer_gender as gender, customer_dob as dob, customer_district as district,
customer_state as state, customer_pincode as pincode, customer_covid_status as covid_status, customer_year_of_birth as year_of_birth, customer_location_name as location_name, customer_covid_result as covid_result, user_id
`;

//Customer object constructor
var Customer = function (customer) {
  this.customer_proof_number = customer.proof_number;
  this.customer_proof_type = customer.proof_type;
  this.customer_name = customer.name;
  this.customer_phone = customer.phone;
  this.customer_martial = customer.martial;
  this.customer_address = customer.address;
  this.customer_gender = customer.gender;
  this.customer_dob = customer.dob;
  this.customer_district = customer.district;
  this.customer_state = customer.state;
  this.customer_pincode = customer.pincode;
  this.customer_covid_status = customer.covid_status;
  this.customer_year_of_birth = customer.year_of_birth;
  this.customer_location_name = customer.location_name;
  this.customer_covid_result = customer.covid_result;
  this.user_id = customer.user_id;
};

Customer.getAllCustomers = function (
  req,
  result,
  limit = 0,
  offset = constant.PAGINATION_OFFSET
) {
  limit =
    req.params.limit && req.params.limit !== undefined
      ? req.params.limit
      : limit;
  offset =
    req.params.offset && req.params.offset !== undefined
      ? req.params.offset
      : offset;
  sql.query(
    `Select ${aliasFields} from customers  order by customer_id desc LIMIT ${limit},${offset}`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
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
  sql.query(
    `Select ${aliasFields} from customers where customer_id = ? `,
    userId,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Customer.updateById = function (id, customer, result) {
  sql.query("Select * from customers where customer_id = ? ", id, function (
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      customer.customer_proof_number =
        customer.proof_number && customer.proof_number != undefined
          ? customer.proof_number
          : res[0]["customer_proof_number"];
      customer.customer_proof_type =
        customer.proof_type && customer.proof_type != undefined
          ? customer.proof_type
          : res[0]["customer_proof_type"];
      customer.customer_name =
        customer.customer_name && customer.customer_name != undefined
          ? customer.customer_name
          : res[0]["customer_name"];
      customer.customer_phone =
        customer.customer_phone && customer.customer_phone != undefined
          ? customer.customer_phone
          : res[0]["customer_phone"];
      customer.customer_martial =
        customer.customer_martial && customer.customer_martial != undefined
          ? customer.customer_martial
          : res[0]["customer_martial"];
      customer.customer_address =
        customer.customer_address && customer.customer_address != undefined
          ? customer.customer_address
          : res[0]["customer_address"];
      customer.customer_gender =
        customer.customer_gender && customer.customer_gender != undefined
          ? customer.customer_gender
          : res[0]["customer_gender"];
      customer.customer_dob =
        customer.customer_dob && customer.customer_dob != undefined
          ? customer.customer_dob
          : res[0]["customer_dob"];
      customer.customer_district =
        customer.customer_district && customer.customer_district != undefined
          ? customer.customer_district
          : res[0]["customer_district"];
      customer.customer_state =
        customer.customer_state && customer.customer_state != undefined
          ? customer.customer_state
          : res[0]["customer_state"];
      customer.customer_pincode =
        customer.customer_pincode && customer.customer_pincode != undefined
          ? customer.customer_pincode
          : res[0]["customer_pincode"];
      customer.customer_covid_status =
        customer.covid_status && customer.covid_status != undefined
          ? customer.covid_status
          : res[0]["customer_covid_status"];

      customer.customer_year_of_birth =
        customer.year_of_birth && customer.year_of_birth != undefined
          ? customer.year_of_birth
          : res[0]["customer_year_of_birth"];
      customer.customer_location_name =
        customer.location_name && customer.location_name != undefined
          ? customer.location_name
          : res[0]["customer_location_name"];
      customer.customer_covid_result =
        customer.covid_result && customer.covid_result != undefined
          ? customer.covid_result
          : res[0]["customer_covid_result"];
      customer.user_id =
        customer.user_id && customer.user_id != undefined
          ? customer.user_id
          : res[0]["user_id"];
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
    }
  });
};

Customer.remove = function (id, result) {
  sql.query("Select * from customers where customer_id = ? ", id, function (
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      if (res.length > 0) {
        sql.query(
          "DELETE FROM customers WHERE customer_id = ?",
          [id],
          function (err, res) {
            if (err) {
              result(null, err);
            } else {
              result(null, res);
            }
          }
        );
      } else {
        result(err, 0);
      }
    }
  });
};

Customer.getCustomerBySearchTerm = function (term, result) {
  sql.query(
    `Select 
    ${aliasFields}
    from customers where customer_proof_number like '%${term}%' 
    OR customer_name like '%${term}%' 
    OR customer_phone like '%${term}%' 
    OR customer_pincode like '%${term}%' order by customer_id desc`,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Customer;
