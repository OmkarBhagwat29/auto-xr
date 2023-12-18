import { createContext, useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect("http://13.235.67.15/:3001");

    setSocket(newSocket);
    console.log("Socket Connected")
    return () => {
      newSocket.disconnect();
      console.log("Socket Dis-Connected")
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };