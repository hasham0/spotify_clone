import Message from '../../models/message.model.js';

const sendMessageService = async (senderId, receiverId, content) => {
  return await Message.create({ senderId, receiverId, content });
};

export { sendMessageService };
