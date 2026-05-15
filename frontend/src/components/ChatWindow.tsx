import { useRef, useState, useEffect } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import socket from "../lib/socket";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";


function ChatWindow() {
  const { user } = useAuthStore();
  const { messages, stats } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!user || !newMessage.trim()) return;
    socket.emit("sendMessage", { message: newMessage });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <div className="flex justify-between items-center p-3 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => navigate(-1)}>
            <IoArrowBack className="w-6 h-6" />
          </button>
          <FaUserCircle className="h-12 w-12 text-gray-400" />
          <div>
            <span className="font-semibold">Global Chat Room</span>
            <span className="text-sm text-gray-600 block">
              {stats.onlineUsers} users online | {stats.totalMessages} messages
              sent | {stats.totalUsers} total users
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md p-2 rounded-xl shadow-sm ${
                msg.isMine
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {!msg.isMine && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaUserCircle className="h-5 w-5 text-gray-400" />
                    <p className="font-medium text-sm">{msg.senderName}</p>
                  </div>
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-500 block text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
              {msg.isMine && (
                <div>
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-200 block text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-3 p-3 bg-white shadow-inner">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
        >
          <IoSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
