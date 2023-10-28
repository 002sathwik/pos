const express = require("express");
const { addbillsController,getBillsController} = require("./../controllers/billsController.js");

const router = express.Router();

// Add this middleware to parse JSON data from the request body
router.use(express.json());

// Routes

// Method - POST
router.post("/add-bills", addbillsController);
router.get("/get-bills",getBillsController);



module.exports = router; // Corrected 'module.exports'
