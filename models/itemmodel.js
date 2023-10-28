const mongoose =require('mongoose')

const itemSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
},{timestamp:true}
);

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;