const itemModel = require("../models/itemmodel.js");

// get items------------------------------------------------------------------------------------------
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};
//  add items items------------------------------------------------------------------------------------
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Item saved");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Edit  perticular item--------------------------------------------------------------------------------
const editItemController = async (req, res) => {
  try {
    const { itemId } = req.params; // Assuming you're passing the item ID in the URL
    const updatedItem = await itemModel.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/// deelte function to rute----------------------------------------------------------------------------
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.params; // Assuming you pass the item ID in the URL
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};
//----------------------------------------------------------------------------------------------------------
module.exports = {
  deleteItemController,
  editItemController,
  getItemController,
  addItemController,
};
