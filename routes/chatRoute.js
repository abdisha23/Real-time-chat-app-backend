const express = require('express');
const { createChat, findChat, findChats } = require('../controllers/chatController');
 const router = express.Router();

 router.post('/', createChat);
 router.get('/:userId', findChats);
 router.get('/:senderId/:receiverId', findChat);

 module.exports = router;