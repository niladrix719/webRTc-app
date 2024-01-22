import React, { useEffect } from 'react';
import socketIO from 'socket.io-client';

const WS = 'http://localhost:8080';

function App() {

  useEffect(() => {
    socketIO(WS);
  }, []);

  return (
    <div className="App flex justify-center items-center h-screen bg-black text-white">
      <div className='flex flex-col w-1/3 items-center gap-4'>
        <input type="text" className='bg-black border-2 py-2 px-4' placeholder="Room ID" />
        <div className='flex gap-2'>
          <button className='bg-gray-700 py-2 px-4'>Join Room</button>
          <button className='bg-red-700 py-2 px-4'>Create Room</button>
        </div>
      </div>
    </div>
  );
}

export default App;
