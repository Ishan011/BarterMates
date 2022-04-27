const router = require('express').Router();
const userController = require('../controllers/user-controller');

const {
    authorize
} = require('../middlewares/authorize');

router
    .post('/user-details', authorize, userController.getUserDetails)
    .post('/update-bio', authorize, userController.updateBio)
    .post('/add-to-wishlist', authorize, userController.addToWishList)
    .post('/get-wishlist', authorize, userController.getWishlist)
    .post('/is-in-wishlist', authorize, userController.isProductInWishlist)
    .post('/list-rooms',authorize, userController.getChatRooms)

module.exports = router;