const {
  listAllInventorys,
  findInventoryById,
  addOneInventory,
  modifyInventory,
  removeInventory,
} = require("../models/inventoryModel");

const getInventorys = async (req, res) => {
  res.json(await listAllInventorys());
};

const getInventory = async (req, res) => {
  const inventory = await findInventoryById(req.params.id);
  if (inventory) {
    res.json(inventory);
  } else {
    res.sendStatus(404);
  }
};

const addInventory = async (req, res) => {
  console.log('postInventory', req.body);

  const result = await addOneInventory(req.body);
  if (result.inventory_id) {
    res.status(201);
    res.json({ message: "New inventory added.", result });
  } else {
    res.sendStatus(400);
  }
};

const updateInventory = async (req, res) => {
  const result = await modifyInventory(req.body, req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteInventory = async (req, res) => {
  const result = await removeInventory(req.params.id);
  console.log("tes",req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};
 
module.exports = { getInventorys, getInventory, addInventory, updateInventory, deleteInventory };
 