import Message from "../models/Message.js";

const saveMessage = (messageWithMood) => {
  const sender = messageWithMood.sender;
  const reciever = messageWithMood.roomId;
  const text = messageWithMood.text;
  const emoji = messageWithMood.emoji;
  const color = messageWithMood.color;

  const newMessage = new Message({
    sender,
    reciever,
    text,
    emoji,
    color,
  });

  newMessage
    .save()
    .then((savedMessage) => {
      console.log("Message saved:", savedMessage);
    })
    .catch((error) => {
      console.error("Error saving message:", error);
    });
};

const getPastMessages = async (req, res) => {
    try {
      const partnerId = req.query.partnerId;
      const userId = req.query.userId;
      const messages = await Message.find({
        $or: [
          { sender: userId, reciever: partnerId },
          { sender: partnerId, reciever: userId },
        ],
      }).sort({ createdAt: 1 });
  
      console.log(messages);
      res.json({messages: messages});
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Unable to fetch messages" });
    }
  }

export { saveMessage, getPastMessages}