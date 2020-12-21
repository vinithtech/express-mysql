const express = require("express");
const router = express.Router();

const customerController = require("../controller/customer");

router
  .route("/get_details/:customerId")
  .get(customerController.read_a_customer);

router.route("/update/:customerId").put(customerController.update_a_customer);

router
  .route("/delete/:customerId")
  .delete(customerController.delete_a_customer);

router.route("/listing").get(customerController.list_all_customers);

router.route("/create").post(customerController.create_a_customer);

module.exports = router;
