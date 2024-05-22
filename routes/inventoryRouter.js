// router.js
const express = require("express");
const router = express.Router();
// controller functions
const inventoryController = require("../controllers/inventoryController");


router.get("/", inventoryController.getInventorys);
router.post("/", inventoryController.addInventory);
router.get("/:id", inventoryController.getInventory);
router.delete("/:id", inventoryController.deleteInventory);  // Updated to removeCat
router.put("/:id", inventoryController.updateInventory);         // Updated to putCat

module.exports = router;