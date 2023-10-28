const mongoose = require("mongoose");
const dotanv = require("dotenv");
const connectDB = require("./config/config.js");
const  ItemModel= require('./models/itemmodel.js')
const  Items= require('./utils/data.js')

//dotenv config----------
dotanv.config();
//dd config--------------
connectDB(); //calling the function , written on config.js(mongdb connection)


// function
const importdata = async () => {
    try {
            await ItemModel.deleteMany()
            const itemsData = await ItemModel.insertMany(Items)
            console.log("all item added");
    
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(` ${error.message}`.bgRed.inverse);
    }
  };

  importdata();