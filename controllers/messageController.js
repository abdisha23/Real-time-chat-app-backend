const Message = require("../models/messageModel");

const createMessage = async(req, res) => {
    const {chatId, senderId, text} = req.body
    try{
        const message = await Message.create({
            chatId, 
            senderId,
            text
        });
        const response = await message.save();
        console.log(response);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};
const findMessages = async(req, res) => {
    const {chatId} = req.params;
    try{
        const messages = await Message.find({chatId});
        res.status(200).json(messages);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    };

};

module.exports = {
    createMessage,
    findMessages
};