import React, { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { SearchChat, getUserChats } from "@/services/chatService";
import { getCurrentUser } from "@/services/userService";

const ChatSearch: React.FC = () => {
  const { setFilteredChats } = useChatStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const user = getCurrentUser();
    const initialChats = getUserChats(user.id);

    const result = SearchChat(query, initialChats);
    setFilteredChats(result);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default ChatSearch;
