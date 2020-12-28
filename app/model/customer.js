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

Customer.getAllCustomers = function (req, result) {
  let user_id = req.user_id;
  let user_type = req.user_type;
  let limit = req.page_limit ? req.page_limit : constant.PAGINATION_LIMIT;
  let page_number = req.page_number ? req.page_number : 1;
  let term = req.search_term ? req.search_term : "";

  let offset =
    page_number && page_number !== undefined
      ? (page_number - 1) * limit
      : (offset - 1) * limit;

  let sql_query =
    user_type === "admin"
      ? `Select ${aliasFields} from customers where 1=1`
      : `Select ${aliasFields} from customers where user_id=${user_id}`;
  if (term) {
    sql_query =
      sql_query +
      ` AND (customer_proof_number like '%${term}%' 
      OR customer_name like '%${term}%' 
      OR customer_phone like '%${term}%' 
      OR customer_pincode like '%${term}%')`;
  }
  sql.query(sql_query, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      let totalRecords = res.length;
      sql.query(
        `${sql_query} ORDER BY customer_id desc LIMIT ${limit} OFFSET ${offset}`,
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            res.total = totalRecords;
            result(null, res);
          }
        }
      );
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

      customer.customer_proof_number =
        customer.customer_proof_number &&
        customer.customer_proof_number != undefined
          ? customer.customer_proof_number
          : res[0]["customer_proof_number"];
      customer.customer_proof_type =
        customer.customer_proof_type &&
        customer.customer_proof_type != undefined
          ? customer.customer_proof_type
          : res[0]["customer_proof_type"];

      customer.customer_covid_status =
        customer.customer_covid_status &&
        customer.customer_covid_status != undefined
          ? customer.customer_covid_status
          : res[0]["customer_covid_status"];
      customer.customer_year_of_birth =
        customer.customer_year_of_birth &&
        customer.customer_year_of_birth != undefined
          ? customer.customer_year_of_birth
          : res[0]["customer_year_of_birth"];
      customer.customer_location_name =
        customer.customer_location_name &&
        customer.customer_location_name != undefined
          ? customer.customer_location_name
          : res[0]["customer_location_name"];
      customer.customer_covid_result =
        customer.customer_covid_result &&
        customer.customer_covid_result != undefined
          ? customer.customer_covid_result
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
