import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000"

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    setSocket(socketIo);

    return () => {
      socketIo.close();
    }; // Cleanup function
  }, []);

  return socket;
};

export default useSocket;
