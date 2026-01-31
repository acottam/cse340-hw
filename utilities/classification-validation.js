// Import necessary modules
const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
*  Classification Data Validation Rules
* ********************************* */
validate.classificationRules = () => {
    return [
        // classification_name is required and must be string
        body("classification_name")
        .trim()
        .notEmpty()
        .matches(/^[A-Z][A-Za-z0-9]*$/)
        .withMessage("\"Classification Name\" must start with a capital letter and contain only letters or numbers (no spaces or special characters)."), // on error this message is sent.
    ]
}


/* ******************************
 * Check data and return errors or continue to next middleware
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors,
        classification_name,
    })
    return
    }
    next()
}

// Export the module
module.exports = validate;
