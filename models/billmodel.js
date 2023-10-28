const mongoose = require("mongoose");

const billsSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentmode: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Bills = mongoose.model("bills", billsSchema);

module.exports = Bills;
