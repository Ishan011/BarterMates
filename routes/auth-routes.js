const router = require('express').Router();
const authController = require('../controllers/auth-controller');   

// Setting routes for authentication
router
    .post('/google-login', authController.googleLogin)
    .get('/is-authenticated', authController.isAuthenticated)
    .get('/logout', authController.logout)
    .post('/login', authController.login)
    .post('/register', authController.register)
    
module.exports = router;