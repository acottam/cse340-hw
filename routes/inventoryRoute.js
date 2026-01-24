// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

// Route to trigger intentional error
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

// Route to trigger footer-based error
router.get("/footer-error", utilities.handleErrors(invController.triggerFooterError));

module.exports = router;
