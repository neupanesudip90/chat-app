import { create } from "zustand";

export interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
  isMine?: boolean;
}

interface Stats {
  onlineUsers: number;
  totalMessages: number;
  totalUsers: number;
}

interface ChatStore {
  messages: Message[];
  stats: Stats;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setStats: (stats: Stats) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  stats: { onlineUsers: 0, totalMessages: 0, totalUsers: 0 },
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setStats: (stats) => set({ stats }),
}));

export default useChatStore;
