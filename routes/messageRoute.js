const express = require('express');
const { createMessage, findMessages } = require('../controllers/messageController');
 const router = express.Router();

 router.post('/', createMessage);
 router.get('/:chatId', findMessages);

 module.exports = router;