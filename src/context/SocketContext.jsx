import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

export const useSocket = () => {
  return useContext(SocketContext);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      const newSocket = io(API_URL, {
        auth: {
          token: token
        },
        withCredentials: true
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
