// Sending the user details request and handling responses
const axios = require('axios')

// get user details 
const  getUserDetails= async()=>{
    try{
        const response = await axios.post("/api/user/user-details",{});
        return response.data;
    }catch(err){
        console.log(err)
        return false
    }
}

// update bio 
const updateBio = async (bio)=>{
    try{
        const response = await axios.post("/api/user/update-bio",{bio});
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}

// add to wishlist 
const addToWishList = async(productId) =>{
    try{
        const response = await axios.post("/api/user/add-to-wishlist",{
            productId
        })
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}

// retrieve wishlist 
const getWishlist = async() =>{
    try{
        const response = await axios.post("/api/user/get-wishlist",{})
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}

const isProductInWishlist = async(productId) =>{
    try{
        const response = await axios.post("/api/user/is-in-wishlist",{productId});
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}

const getChatRoomList = async()=>{
    try{
        const response = await axios.post("/api/user/list-rooms",{});
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}


export {
    getUserDetails,
    updateBio,
    addToWishList,
    getWishlist,
    isProductInWishlist,
    getChatRoomList
}