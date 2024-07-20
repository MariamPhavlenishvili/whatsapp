// components/SendMessage.js
import React, { useState } from "react";

interface SendMessageInputProps {
  onSend: (message: string) => void;
}

const SendMessageInput: React.FC<SendMessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center border rounded-lg p-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border-none outline-none rounded-lg"
      />
      <button
        onClick={handleSend}
        className="bg-primary-300 text-white py-2 px-4 rounded-lg ml-2"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessageInput;
