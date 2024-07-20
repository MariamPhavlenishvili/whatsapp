import { Message } from "@/interfaces/messages.interface";

export const chatsHistoryData: Message[] = [
  {
    id: "1",
    receiverId: "1",
    senderId: "2",
    content: "Hello, Mariam",
    timestamp: "2024-07-18T12:34:56Z",
  },
  {
    id: "2",
    receiverId: "2",
    senderId: "1",
    content: "Hello, Alice",
    timestamp: "2024-07-18T12:34:57Z",
  },
  {
    id: "3",
    receiverId: "1",
    senderId: "2",
    content: "How are you?",
    timestamp: "2024-07-18T12:34:58Z",
  },
  {
    id: "4",
    receiverId: "1",
    senderId: "3",
    content: "Hello, can you send me your time slots?",
    timestamp: "2024-07-18T12:34:58Z",
  },
  {
    id: "5",
    receiverId: "3",
    senderId: "1",
    content: "Hello. Sure, I can",
    timestamp: "2024-07-18T12:35:58Z",
  },
];
