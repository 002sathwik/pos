const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
require("colors");
const connectDB = require("./config/config.js");
//dotenv config----------
dotanv.config();
//dd config--------------
connectDB(); //calling the function , written on config.js(mongdb connection)

// rest object ------------------------------------//
const app = express();

//middle base--------------------------------------//
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes-------------------------------------------//
app.use('/api/items',require('./routes/itemRouters.js'));
app.use('/api/users',require('./routes/userRouters.js'));
app.use('/api/bills',require('./routes/billsRouters.js'));



/// port-------------------------------------------//
const PORT = process.env.PORT || 8080;

//Listen-------------------------------------------//
app.listen(PORT, () => {
  console.log("Server running on port 8080".bgCyan.white);
});
