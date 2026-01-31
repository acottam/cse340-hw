const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");
const invCont = {};

/* ***************************
 *  Deliver Classification View
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data.length > 0 ? data[0].classification_name : "Unknown"
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

/* ****************************************
*  Deliver add classification view
* *************************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
}

/* ****************************************
*  Deliver add inventory view
* *************************************** */
invCont.buildAddInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors: null,
    });
  } catch (error) {
    console.error("Error in buildAddInventory:", error);
    next(error);
  }
}

/* *************************** 
* Process Add Classifcation
* ************************** */
async function addClassification(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body;

  const processResult = await invModel.insertClassification(
    classification_name
  );

  if (processResult) {
    req.flash(
      "notice",
      `Classification "${classification_name}" added successfully.`
    );
    res.redirect("/inv/management");
  } else {
    req.flash(
      "notice",
      "Failed to add classification."
    );
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    });
  }
}
invCont.addClassification = addClassification;

/* ***************************
 *  Deliver Inventory Detail View
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const vehicleHTML = await utilities.buildVehicleDetailHTML(data)
  let nav = await utilities.getNav()
  const vehicleTitle = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
  res.render("./inventory/detail", {
    title: vehicleTitle,
    nav,
    vehicleHTML,
  })
}

/* ***************************
 *  Process Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  console.log("Image paths before saving:", { inv_image, inv_thumbnail });

  const processResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (processResult) {
    req.flash(
      "notice",
      `Inventory item "${inv_make} ${inv_model}" added successfully.`
    );
    res.redirect("/inv/management");
  } else {
    req.flash(
      "notice",
      "Failed to add inventory item."
    );
    let classificationSelect = await utilities.buildClassificationList();
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationSelect,
      errors: null,
    });
  }
}

/* ***************************
 *  Trigger intentional error
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  throw new Error("This is an intentional 500 type error for testing purposes.");
}

/* ***************************
 *  Trigger footer-based error
 * ************************** */
invCont.triggerFooterError = async function (req, res, next) {
  throw new Error("This is a footer-based intentional error for testing purposes.");
}

module.exports = { invCont };
