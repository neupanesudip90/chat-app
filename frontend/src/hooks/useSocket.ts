import { useEffect } from "react";
import socket from "../lib/socket";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import api from "../lib/axios";

const useSocket = () => {
  const { user } = useAuthStore();
  const { addMessage, setMessages, setStats } = useChatStore();

  useEffect(() => {
    if (!user) return;

    // Connect socket with token from cookie
    socket.auth = { token: document.cookie };
    socket.connect();

   const loadMessages = async () => {
     try {
       const res = await api.get("/messages");
       const marked = res.data.data.map((msg: any) => ({
         ...msg,
         isMine: msg.senderId === user._id.toString(),
       }));
       setMessages(marked);
     } catch (err) {
       console.error("Failed to load messages", err);
     }
   };


    loadMessages();

    socket.on("receiveMessage", (msg) => {
      addMessage({ ...msg, isMine: msg.senderId === user._id });
    });

    socket.on("stats", (data) => {
      setStats(data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("stats");
      socket.disconnect();
    };
  }, [user]);
};

export default useSocket;
