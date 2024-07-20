// store/chatStore.ts
import { ChatData, Message } from "@/interfaces/messages.interface";
import create from "zustand";

interface ChatState {
  chats: ChatData;
  setChats: (chats: ChatData) => void;
  setFilteredChats: (filteredChats: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: {}, // Initialize with your initial data format
  setChats: (newChats) => set({ chats: newChats }),
  setFilteredChats: (filteredChats) =>
    set((state) => {
      const newChats: ChatData = {};
      filteredChats.forEach((chat) => {
        if (!newChats[chat.receiverId]) newChats[chat.receiverId] = [];
        newChats[chat.receiverId].push(chat);
      });
      return { chats: newChats };
    }),
}));
