"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { chatsHistoryData } from "../data/history/messages";
import { getCurrentUser } from "@/services/userService";
import { getUserChats } from "@/services/chatService";

import ChatList from "@/view/ChatsList";
import ActiveChat from "../view/Chat";

import "./globals.css";
import { useChatStore } from "@/store/chatStore";
import { useMessagesStore } from "@/store/messagesStore";

const Home = () => {
  const { chats, setChats } = useChatStore();
  const { setMessages, messages } = useMessagesStore();

  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
      if (currentUser === null) {
        router.push("/login");
        return;
      }

      const userChats = getUserChats(currentUser.id, chatsHistoryData);
      if (userChats) {
        setChats(userChats);
      }
  }, [setChats]);

  const handleSelectChat = (userId: string) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userChats = getUserChats(currentUser.id, chatsHistoryData);
      if (userChats && userChats[userId]) {
        setMessages(userChats[userId]);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {chats && Object.keys(chats).length > 0 ? (
        <>
          <ChatList chats={chats} onSelectChat={handleSelectChat} />
          {messages.length > 0 && <ActiveChat Messages={messages} />}
        </>
      ) : (
        <p>Loading chats...</p>
      )}
    </div>
  );
};

export default Home;
