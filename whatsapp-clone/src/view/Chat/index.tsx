import React, { useEffect } from "react";
import useSocket from "@/hooks/useSockets";
import ChatHeader from "../../components/ChatHeader";
import SendMessageInput from "@/components/ChatInput"; // Adjust import path as needed
import { getUserById, getCurrentUser } from "@/services/userService";
import { SendMessage } from "@/services/chatService";
import { useMessagesStore } from "@/store/messagesStore";
import { generateId } from "@/helpers/generateId";
import { Message } from "@/interfaces/messages.interface";

interface ActiveChatProps {
  Messages: Message[];
}

const ActiveChat: React.FC<ActiveChatProps> = ({ Messages }) => {
  const { messages, addMessage } = useMessagesStore();
  const socket = useSocket();
  const firstMessage = Messages[0];
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (newMessage: Message) => {
        console.log(newMessage)
        addMessage(newMessage);
      });

      return () => {
        socket.off("receiveMessage"); // Clean up the socket listener
      };
    }
  }, [socket, addMessage]);

  const handleSendMessage = (message: string) => {
    if (!currentUser) return;

    const receiverId =
      firstMessage.senderId === currentUser.id
        ? firstMessage.receiverId
        : firstMessage.senderId;

    const newMessage: Message = {
      id: generateId(messages),
      senderId: currentUser.id,
      receiverId: getUserById(receiverId)?.id || "",
      content: message,
      timestamp: new Date().toISOString(),
    };

    SendMessage(newMessage, socket!);
  };

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col bg-primary-100">
      <div className="flex-1 overflow-y-auto">
        <ChatHeader
          userImage={
            getUserById(
              firstMessage.senderId === currentUser?.id
                ? firstMessage.receiverId
                : firstMessage.senderId
            )?.image
          }
          name={
            getUserById(
              firstMessage.senderId === currentUser?.id
                ? firstMessage.receiverId
                : firstMessage.senderId
            )?.name
          }
        />
        {messages.map((chat: Message) => {
          const sender = getUserById(chat.senderId);
          const receiver = getUserById(chat.receiverId);

          return (
            <div
              key={chat.id}
              className={`flex p-2 ${
                currentUser?.id === chat.senderId
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`m-1 ${
                  currentUser?.id === chat.senderId ? "text-right" : "text-left"
                }`}
              >
                <p className="text-sm text-gray-500">
                  {currentUser?.id === chat.senderId
                    ? "You"
                    : sender?.name || receiver?.name}
                </p>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    currentUser?.id === chat.senderId
                      ? "bg-primary-300 text-white"
                      : "bg-white"
                  }`}
                >
                  {chat.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-300">
        <SendMessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ActiveChat;
