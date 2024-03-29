import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();

    const enterRoom = ({ roomId }: { roomId: string }) => {
        console.log({ roomId });
        navigate(`room/${roomId}`);
    };

    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log({ participants });
    }

    useEffect(() => {
        const meId = uuidv4();
        const peer = new Peer(meId);
        setMe(peer);

        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              .then((stream) => {
                setStream(stream);
              })
              .catch((error) => {
                console.error(error);
              });
          } catch (error) {
            console.error(error);
          }
          
        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);
    }, []);

    return (
        <RoomContext.Provider
            value={{
                ws, me, stream
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};