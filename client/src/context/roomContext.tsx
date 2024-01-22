import { createContext } from "react";
import socketIOClient from "socket.io-client";
const WS = 'http://localhost:8080';

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomContext.Provider value={{ws}}>
      {children}
    </RoomContext.Provider>
  );
}