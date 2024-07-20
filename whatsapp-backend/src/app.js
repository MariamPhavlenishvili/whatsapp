const express = require("express");
const http = require("http");
const socketIo = require("socket.io");


const app = express();
const server = http.createServer(app);
const PORT = 4000;






const io = socketIo(server
  , {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}
);


io.on("connection", async (socket) => {
  console.log("New client connected");

  // Listen for new messages
  await socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
