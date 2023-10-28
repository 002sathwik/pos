const mongoose = require("mongoose");
require("colors");

// connect db function----------------------------------------------------//
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error : ${error.message}`.bgRed);
  }
};

module.exports = connectDB; // Exporting  function 
