import { Response } from "express";
import { AuthRequest } from "../types";
import {
  saveMessage,
  getAllMessages,
  getMessageCount,
} from "../services/message.service";

export const sendMessage = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { message } = req.body;
    const newMessage = await saveMessage(
      req.user!._id.toString(),
      req.user!.name,
      message,
    );
    res.status(201).json({ data: newMessage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const messages = await getAllMessages();
    const formatted = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.sender.toString(), 
      message: msg.message,
      createdAt: msg.createdAt,
    }));
    res.status(200).json({ data: formatted });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCounts = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const messageCount = await getMessageCount();
    res.status(200).json({ messageCount });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
