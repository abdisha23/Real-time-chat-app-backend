const Chat = require("../models/chatModel");


const createChat = async (req, res) => {
    const {senderId, receiverId} = req.body;
    try{
        const chat = await Chat.findOne({
            members: { $all: [senderId, receiverId]}
        });
        if(chat) return res.status(200).json(chat);

        const newChat = await Chat.create({
            members: [senderId, receiverId]
        });
        const response = await newChat.save();
        console.log(response)
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    };
};

const findChats = async(req, res) => {
    const userId = req.params.userId;
    try{
        const chats = await Chat.find({ 
                members: {$in: [userId]}
          }
        );
        res.status(200).json(chats);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
};

const findChat = async (req, res) => {
    const {senderId, receiverId} = req.params;
    try{
        const chat = await Chat.findOne({
            members: { $all: [senderId, receiverId]}
        });
        res.status(200).json(chat);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    };
};


module.exports = {
    createChat,
    findChats,
    findChat
}