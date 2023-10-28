const userModel = require("../models/usermodel.js");

// login------------------------------------------------------------------------------------------
const loginController = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await userModel.findOne({ userid, password });

    if (user) {
      res.status(200).send(user);
    }else{
      res.json({
        message:"Login Fail"
      });
    }
   
 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//  Register-----------------------------------------------------------------------------------
const registerController = async (req, res) => {
  try {
    const newUser = new userModel({...req.body,verified:true});
    await newUser.save();
    res.status(201).send("Registered");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

//----------------------------------------------------------------------------------------------------------
module.exports = {
  loginController,
  registerController,
};
