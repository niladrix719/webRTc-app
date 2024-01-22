import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const port = 8080;
const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("user is connected");

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("user with ID: " + socket.id + " joined room: " + data);
  });

  socket.on("createRoom", () => {
    const roomId = uuidv4();
    socket.join(roomId);
    socket.emit("roomCreated", roomId);
    console.log("user with ID: " + socket.id + " created room: " + roomId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})