const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
*  Inventory Data Validation Rules
* ********************************* */
validate.inventoryRules = () => {
    return [
        // inv_make is required and must be string
        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("\"Make\" must be at least 2 characters."), // on error this message is sent.

        // inv_model is required and must be string
        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("\"Model\" must be at least 3 characters."), // on error this message is sent.

        // inv_year is required and must be a valid year
        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .isInt({ min: 1886, max: new Date().getFullYear() + 1 }) // considering next year's models
        .withMessage("Please provide a valid vehicle \"Year\"."), // on error this message is sent.

        // inv_description is required and must be string
        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 15 })
        .withMessage("\"Description\" must be at least 15 characters."), // on error this message is sent.

        // inv_image is required and must be a valid URL
        body("inv_image")
        .trim()
        .notEmpty()
        .matches(/^(?!https?:)(?!\/\/)(?!data:)(?:\.{0,2}\/)?[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)+$/)
        .withMessage("\"Image Path\" must be a relative path (no http/https)."), // on error this message is sent.

        // inv_thumbnail is required and must be a valid URL
        body("inv_thumbnail")
        .trim()
        .notEmpty()
        .matches(/^(?!https?:)(?!\/\/)(?!data:)(?:\.{0,2}\/)?[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)+$/)
        .withMessage("\"Thumbnail Path\" must be a relative path (no http/https)."), // on error this message is sent.

        // inv_price is required and must be a valid price
        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("\"Price\" must be a number greater than or equal to 0."), // on error this message is sent.

        // inv_miles is required and must be a valid number
        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("\"Miles\" must be a number greater than or equal to 0."), // on error this message is sent.

        // inv_color is required and must be string
        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("\"Color\" must be at least 3 characters."), // on error this message is sent.
        
        // classification_id is required and must be an integer
        body("classification_id")
        .trim()
        .escape()
        .notEmpty()
        .isInt()
        .withMessage("Please select a \"Classification\"."), // on error this message is sent.   
    ]
}

/* ******************************
 * Check data and return errors or continue to next middleware
 * ***************************** */
validate.checkInvData = async (req, res, next) => {
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
    } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationSelect,
        errors,
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
    })
    return
    }
    next()
}

// Export the module
module.exports = validate;
