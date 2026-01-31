// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const invController = require("../controllers/invController");
const classValidate = require('../utilities/classification-validation');
const invValidate = require('../utilities/inventory-validation');
//const e = require("connect-flash");

// Route to management view
router.get("/management", utilities.handleErrors(async (req, res, next) => {
    let nav = await utilities.getNav();
    res.render("inventory/management", {
        title: "Management",
        nav,
        errors: null,
    });
}));

// Route to add classification view
router.get("/add-classification", utilities.handleErrors(invController.invCont.buildAddClassification));

/// Route to add classification data
router.post(
    "/add-classification",
    classValidate.classificationRules(),
    classValidate.checkClassData,
    utilities.handleErrors(invController.invCont.addClassification)
);

// Route to add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.invCont.buildAddInventory));

// Route to add inventory data
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInvData,
  utilities.handleErrors(invController.invCont.addInventory)
);

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.invCont.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.invCont.buildByInventoryId));

// Route to trigger intentional error
router.get("/trigger-error", utilities.handleErrors(invController.invCont.triggerError));

// Route to trigger footer-based error
router.get("/footer-error", utilities.handleErrors(invController.invCont.triggerFooterError));

// Export the router
module.exports = router;