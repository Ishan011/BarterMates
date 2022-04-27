// This controller is responsible for user related tasks
const WishlistModel = require('../models/wish-list-model');
const UserModel = require('../models/users-model');
const ChatRoomModel = require('../models/chat-room-model');

// For getting the user details
const getUserDetails = async(req,res) =>{
    try{
        const userId = req.id;
        const userDetails = await UserModel.findById(userId);

        return res.status(200).json({
            status: true,
            userDetails
        })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// Allows updating of user bio in profile
const updateBio = async(req,res)=>{
    try{
        const userId = req.id;
        const user = await UserModel.findById(userId);

        // console.log(req.body)

        user['bio'] = req.body.bio;

        // console.log(user)
        await user.save();
        return res.status(200).json({
            status: true,
            message: "Done"
        })
    }catch(err){
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })   
    }
}

// for toggling wishlist in profile
const addToWishList = async(req, res) =>{
    try{
        if(req.id){
            let item = await WishlistModel.findOne({
                user_id: req.id,
                product_id: req.body.productId
            })
            if(!item){
                item = new WishlistModel({
                    user_id: req.id,
                    product_id: req.body.productId,
                    status: true
                })
            }else{
                //  wishlist toggle
                if(item.status == true){
                    item.status = false;
                }else{
                    item.status = true;
                }
            }
            await item.save();
            return res.status(200).json({
                status: true,
                data: item.status
            })
        }
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// fetches wishlist for a user
const getWishlist = async(req, res) =>{
    try{    
        const wishlist = await WishlistModel.find({
            user_id: req.id
        })

        let lookup = {};

        wishlist.forEach(element=>{
            lookup[element.product_id] = element.status
        })
        return res.status(200).json({
            status: true,
            wishlist: lookup
        })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// checks whether the product is already in wishlist or not
const isProductInWishlist = async(req, res)=>{
    try{
        if(req.body.productId && req.id){

            const item = await WishlistModel.findOne({
                product_id: req.body.productId,
                user_id: req.id
            })

            if(item){
                return res.status(200).json({
                    status: true,
                    available: item.status
                })
            }
        }
        return res.status(200).json({
            status: true,
            available: false
        })

    }catch(err){
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// fetches existing chat rooms open for a user
const getChatRooms  = async(req, res) =>{
    try{
        let chatRooms = [];


        let room = await ChatRoomModel.find({
            user1: req.id
        }).populate('user2');

        room.forEach(element=>{
            if(element.user2){
                const temp = {
                    ...element
                }
                temp.roomId = element.user2._id
                chatRooms.push(temp)
            }
        })

        room =  await ChatRoomModel.find({
            user2: req.id
        }).populate('user1');

        room.forEach(element=>{
            if(element.user2){
                const temp = {
                    ...element
                }
                temp.roomId = element.user1._id;
                element.roomId = element.user2._id
                chatRooms.push(element)
            }
        })
        console.log(chatRooms)
        return res.status(200).json({
            status: true,
            rooms: chatRooms
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

module.exports ={
    getUserDetails,
    updateBio,
    addToWishList,
    getWishlist,
    isProductInWishlist,
    getChatRooms
}