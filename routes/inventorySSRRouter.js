// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const inventorySSR = require("../controllers/inventorySSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with inventorys using EJS
router.get("/", inventorySSR.renderInventorys);
// End2: Define a route to render the addinventory.ejs view
router.get("/addinventory", inventorySSR.renderForm);
// End3:Route to add  inventory using EJ
router.post("/addinventory", inventorySSR.addInventory);
// Define a route to render the singleinventory.ejs view
router.get("/single-inventory/:id", inventorySSR.renderInventory);
// Define a route to delete singleinventory
router.delete("/single-inventory/:id", inventorySSR.deleteInventory);
// Define a route to update single inventory.ejs
router.put("/single-inventory/:id", inventorySSR.updateInventory);
// Define inventory to update
router.get("/single-inventory/update/:id", inventorySSR.renderUpdateInventory);



//router.get("/", inventoryController.getInventorys);
//router.post("/", inventoryController.addInventory);
//router.get("/:id", inventoryController.getInventory);
//router.delete("/:id", inventoryController.deleteInventory);  // Updated to removeCat
//router.put("/:id", inventoryController.updateInventory);         // Updated to putCat


module.exports = router;