"use client";
import React from "react";
import { getUserById, getCurrentUser } from "@/services/userService";
import { getLatestMessages } from "@/helpers/getLatestMessages"; // Corrected import path

import ChatHeader from "../../components/ChatHeader";
import SearchChat from "@/components/ChatSearch";
import { ChatData, Message } from "@/interfaces/messages.interface";

const ChatList = ({
  chats,
  onSelectChat,
}: {
  chats: ChatData;
  onSelectChat: (userId: string) => void;
}) => {
  const latestMessages: Message[] = getLatestMessages(
    Object.values(chats).flat()
  );
  const activeUser = getCurrentUser();

  return (
    <div className="w-full md:w-1/3 border-r border-gray-300 overflow-y-auto">
      <ChatHeader userImage={activeUser.image} name={activeUser.name} />
      <SearchChat />
      {latestMessages.map((chat: Message, index: number) => {
        const otherUserId =
          chat.senderId === activeUser.id ? chat.receiverId : chat.senderId;
        const user = getUserById(otherUserId);
        return user ? (
          <div
            key={index}
            className="flex p-4 border-b cursor-pointer hover:bg-secondary-300"
            onClick={() => onSelectChat(otherUserId)}
          >
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={user.image}
              alt={user.name}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <span className="text-sm text-gray-600">
                  {new Date(chat.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.content}</p>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ChatList;
