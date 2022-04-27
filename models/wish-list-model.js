// User data model 
// create schema for wishlist

// Tutorial followed to learn mongoose 
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
const mongoose =require('mongoose')

const WishlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory"
    },
    status: Boolean
},{
    timestamps:true
})


module.exports = mongoose.model('Wishlist', WishlistSchema);