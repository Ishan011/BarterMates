const router = require('express').Router();
const chatRoomController = require('../controllers/chat-controller');
const {
    authorize
} = require('../middlewares/authorize');

router
    .post('/get-chatroom', authorize, chatRoomController.getChatRoom)

module.exports = router;