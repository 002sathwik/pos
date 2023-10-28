const billsModel = require("../models/billmodel.js");

//  add items items------------------------------------------------------------------------------------
const addbillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.status(200).send("Bill saved");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "Internal Server Error: Something went wrong while saving the bill."
      );
  }
};
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find(); // Use billsModel to fetch bills
    res.status(200).send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


//----------------------------------------------------------------------------------------------------------
module.exports = {
  addbillsController,
  getBillsController,

};
