import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const rooms: Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidv4();
        socket.join(roomId);
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
        console.log(`user created the room ${roomId}`);
    };

    const joinRoom = ({ roomId, peerId }: { roomId: string, peerId: string }) => {
        if (rooms[roomId]) {
            rooms[roomId].push(peerId);
            socket.join(roomId);
            console.log(`user joined the room ${roomId}`);
            socket.to(roomId).emit("get-users", { roomId, participants: rooms[roomId] });
        }

        socket.on("disconnect", () => {
            if (rooms[roomId]) {
                rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
                socket.to(roomId).emit("user-disconnected", { roomId, peerId });
            }
        });
    };
    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};