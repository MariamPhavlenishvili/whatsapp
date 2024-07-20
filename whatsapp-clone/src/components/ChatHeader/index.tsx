import React from "react";

interface ChatHeaderProps {
  userImage: string | null;
  name: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userImage, name }) => {
  return (
    <div className="flex items-center p-2 border-b border-gray-100 bg-gray-100 w-full">
      <img src={userImage || ""} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default ChatHeader;
