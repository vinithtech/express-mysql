const express = require("express");
const router = express.Router();

const customerController = require("../controller/customer");

// todoList Routes
router
  .route("/customers")
  .get(customerController.list_all_customers)
  .post(customerController.create_a_customer);

router
  .route("/customer/:customerId")
  .get(customerController.read_a_customer)
  .put(customerController.update_a_customer)
  .delete(customerController.delete_a_customer);

module.exports = router;
