// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation');

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to process registration form
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Route to trigger intentional error
router.get("/trigger-error", utilities.handleErrors(accountController.triggerError));

// Route to trigger footer-based error
router.get("/footer-error", utilities.handleErrors(accountController.triggerFooterError));

// Export the router
module.exports = router;