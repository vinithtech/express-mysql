const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.route("/validate").post(userController.validate_user);

module.exports = router;
