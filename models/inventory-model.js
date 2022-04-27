// User data model 
// create schema for inventory

// Tutorial followed to learn mongoose 
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
const mongoose =require('mongoose');
const {
    ObjectId
} = mongoose.Schema.Types;

const InventorySchema = new mongoose.Schema({
    // specifying type of variables
    title: String,
    location: String,
    category: {
        type: String
    },
    images: Array,
    type: String,
    currency: String,
    specifications: Array,
    description: String,
    owner:{
        type:ObjectId,
        ref: "User"
    },
    price: Number,
    swap: String
},{
    timestamps:true
})

module.exports = mongoose.model('Inventory', InventorySchema);