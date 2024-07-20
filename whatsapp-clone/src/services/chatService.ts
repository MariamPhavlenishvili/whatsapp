import { Message } from "@/interfaces/messages.interface";

import { getUserByName } from "./userService";
import { chatsHistoryData } from "@/data/history/messages";
import { Socket } from "socket.io-client";

/**
 * Searches chats for a given query.
 * @param {Array} allChats - Array of all chat messages.
 * @param {string} query - Search query.
 * @returns {Array} - Filtered chat messages.
 */

export const getUserChats = (
  userId: string,
  chats: Message[] = chatsHistoryData
) => {
  const userChats = chats.filter(
    (message) => message.senderId === userId || message.receiverId === userId
  );

  const groupedChats: { [key: string]: Message[] } = {};

  userChats.map((message) => {
    const otherUserId =
      message.senderId === userId ? message.receiverId : message.senderId;
    if (!groupedChats[otherUserId]) {
      groupedChats[otherUserId] = [];
    }
    groupedChats[otherUserId].push(message);
  });

  return groupedChats;
};

export const SearchChat = (
  name: string,
  chats: Record<string, Message[]>
): Message[] => {
  const searchedUser = getUserByName(name);

  const allChats = Object.values(chats).flat() as Message[];

  if (searchedUser) {
    return allChats.filter(
      (chat) =>
        chat.senderId === searchedUser.id || chat.receiverId === searchedUser.id
    );
  }

  return allChats;
};

export const SendMessage = (newMessage: Message, socket: Socket) => {
  if (socket) {
    socket.emit("sendMessage", newMessage);
  }
};
