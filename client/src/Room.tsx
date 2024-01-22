import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { RoomContext } from './context/roomContext';

export const Room = () => {
  const { roomID } = useParams();
  const { ws } = useContext(RoomContext);

  useEffect(() => {
    ws.emit('joinRoom', roomID);
  }, [roomID]);

  return (
    <div className="bg-black text-white h-screen">
      <h1>Room ID: {roomID}</h1>
    </div>
  )
}