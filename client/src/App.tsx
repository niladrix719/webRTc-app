import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { RoomContext } from './context/roomContext';

const WS = 'http://localhost:8080';

function App() {
  const { ws } = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    socketIO(WS);
  }, []);

  useEffect (() => {
    ws.on("roomCreated", (roomID: string) => {
      console.log(`Room created: ${roomID}`);
      navigate(`/${roomID}`);
    });
  }, []);

  const createRoom = () => {
    ws.emit('createRoom');
  }

  return (
    <div className="App flex justify-center items-center h-screen bg-black text-white">
      <div className='flex flex-col w-1/3 items-center gap-4'>
        <div className='flex gap-2'>
          <button className='bg-red-700 py-2 px-4' onClick={createRoom}>Create Room</button>
        </div>
      </div>
    </div>
  );
}

export default App;
