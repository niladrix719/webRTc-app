import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIO from 'socket.io-client';

const WS = 'http://localhost:8080';

function App() {

  useEffect(() => {
    socketIO(WS);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World!
        </p>
      </header>
    </div>
  );
}

export default App;
