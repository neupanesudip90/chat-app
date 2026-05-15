import Message from "../models/message.model";

export const saveMessage = async (
  senderId: string,
  senderName: string,
  message: string,
) => {
  const newMessage = await Message.create({
    sender: senderId,
    senderName,
    message,
  });
  return newMessage;
};

export const getAllMessages = async () => {
  return await Message.find().sort({ createdAt: 1 });
};

export const getMessageCount = async () => {
  return await Message.countDocuments();
};
