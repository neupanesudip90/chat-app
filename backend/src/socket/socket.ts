import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Message from "../models/message.model";

const onlineUsers = new Map<string, string>(); // userId -> userName

const initSocket = (io: Server): void => {
  // Socket auth middleware — reads token from HTTP-only cookie
  io.use(async (socket: any, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie || "";
      const token = cookieHeader
        .split(";")
        .find((c: string) => c.trim().startsWith("access_token="))
        ?.split("=")[1];

      if (!token) return next(new Error("No token"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId).select("-password");
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", async (socket: any) => {
    console.log("User connected:", socket.user.name);

    // Track online user by userId — same user on two tabs counts as 1
    onlineUsers.set(socket.user._id.toString(), socket.user.name);

    // Load chat history and current stats
    const messages = await Message.find().sort({ createdAt: 1 });
    const totalMessages = await Message.countDocuments();
    const totalUsers = await User.countDocuments();

    // Send chat history only to this user
    socket.emit("chatHistory", messages);

    // Broadcast updated stats to everyone
    io.emit("stats", {
      onlineUsers: onlineUsers.size,
      totalMessages,
      totalUsers,
    });

    // Notify others someone joined
    socket.broadcast.emit("userJoined", { name: socket.user.name });

    // Handle incoming message
    socket.on("sendMessage", async (data: { message: string }) => {
      if (!data.message?.trim()) return;

      try {
        const newMessage = await Message.create({
          sender: socket.user._id,
          senderName: socket.user.name,
          message: data.message,
        });

        const payload = {
          _id: newMessage._id,
          senderId: socket.user._id.toString(),
          senderName: socket.user.name,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
        };

        const updatedMessageCount = await Message.countDocuments();

        // Broadcast message to everyone
        io.emit("receiveMessage", payload);

        // Broadcast updated stats to everyone
        io.emit("stats", {
          onlineUsers: onlineUsers.size,
          totalMessages: updatedMessageCount,
          totalUsers,
        });
      } catch (err) {
        console.error("Message error:", err);
      }
    });

    // Handle disconnect
    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.user.name);

      onlineUsers.delete(socket.user._id.toString());

      const updatedMessageCount = await Message.countDocuments();
      const updatedUserCount = await User.countDocuments();

      io.emit("stats", {
        onlineUsers: onlineUsers.size,
        totalMessages: updatedMessageCount,
        totalUsers: updatedUserCount,
      });
    });
  });
};

export default initSocket;
