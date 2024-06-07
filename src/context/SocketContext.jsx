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
  const [notificationSocket, setNotificationSocket] = useState(null);
  const [messageSocket, setMessageSocket] = useState(null);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      const newNotificationSocket = io(`${API_URL}/notifications`, {
        auth: {
          token: token
        },
        withCredentials: true
      });
      setNotificationSocket(newNotificationSocket);

      const newMessageSocket = io(`${API_URL}/messages`, {
        auth: {
          token: token
        },
        withCredentials: true
      });
      setMessageSocket(newMessageSocket);

      return () => {
        newNotificationSocket.close();
        newMessageSocket.close();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ notificationSocket, messageSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
