const express = require("express");
const {
  loginController,
  registerController,
} = require("./../controllers/userController.js");

const router = express.Router();

// Add this middleware to parse JSON data from the request body
router.use(express.json());

// Routes
// Method - GET
router.post("/login", loginController);
// Method - POST
router.post("/register", registerController);

module.exports = router;
