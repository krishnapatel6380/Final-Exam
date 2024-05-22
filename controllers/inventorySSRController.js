const Inventory = require("../models/inventoryModel");

// Render Controller: Render index.html with inventorys using EJS
const renderInventorys = async (req, res) => {
  const user_id = req.user._id
  try {
    const inventorys = await Inventory.find({user_id}).sort({createdAt: -1});
    res.render("index", { inventorys }); // Render index.ejs with inventorys data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Inventory by ID
const renderInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const inventory = await Inventory.findById(id).where('user_id').equals(user_id);
    if (!inventory) {
      return res.render("notfound");
    }
    res.render("singleinventory", { inventory }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Inventory:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addinventory"); // Assuming "addinventory.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new inventory (used for rendering and API)
const addInventory = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const user_id = req.user._id;
  
    const newInventory = new Inventory({  name, description, quantity, price,user_id });
    await newInventory.save();
    // Redirect to the main page after successfully adding the inventory
    console.log("Inventory added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).render("error");
  }
};

// Delete Inventory by ID
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const inventory = await Inventory.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!inventory) {
      return res.status(404).render("notfound");
    }
    console.log("Inventory delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Inventory:", error);
    res.status(500).render("error");
  }
};


// Update Inventory by ID
const renderUpdateInventory = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the inventory by id
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.render("notfound");
    }

    // Render the singleinventory.ejs template with the inventory data
    res.render("updateinventory", { inventory });

  } catch (error) {
    console.error("Error fetching Inventory:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the inventory
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const {  name, description, quantity, price } = req.body;
    const updatedInventoryData = {  name, description, quantity, price};

    // Update the inventory with the new data
    const updatedInventory = await Inventory.findOneAndUpdate({ _id: id, user_id: user_id }, updatedInventoryData, { new: true });

    if (!updatedInventory) {
      return res.render("notfound");
    }

    // console.log("Inventory updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Inventory:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderInventorys,
  renderInventory,
  addInventory,
  renderForm,
  deleteInventory,
  updateInventory,
  renderUpdateInventory,
};
