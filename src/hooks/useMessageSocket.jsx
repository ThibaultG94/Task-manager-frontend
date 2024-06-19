import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessageToConversation, markConversationAsRead } from '../store/feature/conversations.slice';
import { useSocket } from '../context/SocketContext';

const useMessageSocket = () => {
  const dispatch = useDispatch();
  const { messageSocket } = useSocket();

  useEffect(() => {
    if (messageSocket) {
      messageSocket.on('receive_message', (message) => {
        dispatch(addMessageToConversation({ conversationId: message.conversationId, msg: message }));
      });

      messageSocket.on('message_read', ({ conversationId, userId }) => {
        dispatch(markConversationAsRead({ conversationId, userId }));
      });

      return () => {
        messageSocket.off('receive_message');
        messageSocket.off('message_read');
      };
    }
  }, [messageSocket, dispatch]);
};

export default useMessageSocket;
