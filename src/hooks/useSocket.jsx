import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessageToConversation } from '../store/feature/conversations.slice';

const API_URL = process.env.REACT_APP_API_URL;

const useSocket = () => {
  const dispatch = useDispatch();
  const socket = io(API_URL);

  useEffect(() => {

    socket.on('receive_message', (message) => {
      dispatch(addMessageToConversation({ conversationId: message.conversationId, message }));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return socket;
};

export default useSocket;
