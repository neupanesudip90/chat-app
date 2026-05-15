import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import connectDB from "./config/db";
import initSocket from "./socket/socket";


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initSocket(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
