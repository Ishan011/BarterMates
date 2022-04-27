// This controller is responsible for inventory- all the listings present in platform
const Inventory = require('../models/inventory-model');
const WishlistModel = require('../models/wish-list-model');

// For adding products into inventory
const addProduct = async(req,res) =>{
    try{
        
        if(req.id){
            const product =  new Inventory({
                ...req.body,
                owner: req.id
            })

            console.log(product)

            await product.save();
            return res.status(200).json({
                status: true,
                message: "Product added"
            })
        }
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// For filtering products inside inventory
const getProductsList = async(req, res) =>{
    try{
        const {
            filter
        } =req.body;

        console.log(filter)


        let updatedFilter = {};
        // To filter items posted by the user itself on profile
        if(filter.selfOnly){
            updatedFilter["owner"] = req.id;
        }
        // Filter options present in the search page
        if(filter && filter.category){
            updatedFilter["category"] = filter.category;
        }
        if(filter && filter.location){
            updatedFilter["location"] = filter.location;
        }
        if(filter && filter.type){
            updatedFilter["type"] = filter.type;
        }
        // To implement search via keyword present in title of a listing
        if(filter && filter.keyword){
            const keyword = new RegExp(filter.keyword, 'i');
            updatedFilter["title"] = {
                $regex: keyword
            }
        }
        // console.log("updatedFilter", updatedFilter)

        const products = await Inventory.find({
            ...updatedFilter
        })
        return res.status(200).json({
            status: true,
            products,
        })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// For showing details for individual listing
const getProductDetails = async(req,res)=>{
    try{
        const productDetail = await Inventory.findOne({
            _id: req.body.productId
        }).populate('owner');
        return res.status(200).json({
            status: true,
            productDetail
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// For wishlisting product in profile
const getWishlist = async(req,res)=>{
    try{
        const wishlist = await WishlistModel.find({
            user_id: req.id,
            status: true
        }).populate("product_id")

        // Initially wishlist set to empty array
        let wishlistProducts = [];
        // console.log(wishlist)

        if(wishlist){
            wishlist.forEach(element => {
                if(element.product_id){
                    wishlistProducts.push(element.product_id);   
                }
            });
        }
        return res.status(200).json({
            status: true,
            products:wishlistProducts
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}


module.exports = {
    addProduct,
    getProductsList,
    getProductDetails,
    getWishlist
}