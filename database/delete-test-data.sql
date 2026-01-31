/*
This script deletes test data related to inventory from the database.
 */
DELETE FROM inventory
WHERE classification_id IN (
        SELECT classification_id
        FROM classification
        WHERE classification_id > 5 
    );

/* Delete any remaining inventory items with inventory_id greater than 15 */ 
DELETE FROM inventory
WHERE inv_id > 15;

/* Now delete the classifications related to test data */
DELETE FROM classification
WHERE classification_id NOT IN (
        SELECT classification_id 
        FROM inventory
    );