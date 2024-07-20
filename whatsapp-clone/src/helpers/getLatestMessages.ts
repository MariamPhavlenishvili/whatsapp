// utils/getLatestMessages.js
import { Message } from "@/interfaces/messages.interface";
import { getCurrentUser } from "@/services/userService";

export const getLatestMessages = (chats: Message[]) => {
  const latestMessagesMap: { [key: string]: Message } = {};

  chats.forEach((chat: Message) => {
    const otherUserId =
      chat.senderId === getCurrentUser().id ? chat.receiverId : chat.senderId;

    if (
      !latestMessagesMap[otherUserId] ||
      new Date(chat.timestamp) >
        new Date(latestMessagesMap[otherUserId].timestamp)
    ) {
      latestMessagesMap[otherUserId] = chat;
    }
  });

  return Object.values(latestMessagesMap);
};
