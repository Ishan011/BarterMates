const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');
const {
    authorize
} = require('../middlewares/authorize');


router
    .post('/add-product',authorize, inventoryController.addProduct)
    .post('/get-products', inventoryController.getProductsList)
    .post('/product-detail', inventoryController.getProductDetails)
    .post('/wishlist', authorize, inventoryController.getWishlist)
    
module.exports = router;