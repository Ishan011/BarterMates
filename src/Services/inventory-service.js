// Sending inventory request and handling responses
const axios = require('axios')

// add product 
const  addProductToInventory= async(data)=>{
    try{
        const response = await axios.post("/api/inventory/add-product",data);
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}

// retrieve product list 
const  getProductsList= async(filter)=>{
    try{
        const response = await axios.post("/api/inventory/get-products",filter);
        console.log(response.data)
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}

const  getWishlistProducts = async()=>{
    try{
        const response = await axios.post("/api/inventory/wishlist",{});
        console.log(response.data)
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}

const  getProductDetails= async(productId)=>{
    try{
        const response = await axios.post("/api/inventory/product-detail",{
            productId
        });
        return response.data;
    }catch(err){
        console.log(err)
        return false
    }
}

export {
    addProductToInventory,
    getProductsList,
    getProductDetails,
    getWishlistProducts
}