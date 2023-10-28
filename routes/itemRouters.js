const express = require("express");
const {
  deleteItemController,
  editItemController,
  addItemController,
  getItemController,
} = require("./../controllers/itemController.js");

const router = express.Router();

// Add this middleware to parse JSON data from the request body
router.use(express.json());

// Routes
// Method - GET
router.get("/get-item", getItemController);
// Method - POST
router.post("/add-item", addItemController);
// Method -  PUT
router.put("/edit-item/:itemId", editItemController);
// Method -  Delete
router.delete("/delete-item/:itemId", deleteItemController);

module.exports = router;
