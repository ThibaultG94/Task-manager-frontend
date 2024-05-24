import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { closeWindow, minimizeWindow } from '../../../store/feature/conversationWindows.slice';
import { selectConversationByContactId } from '../../../store/selectors/conversationsSelectors';
import CloseConversation from '../../Buttons/CloseConversation';
import { format, parseISO } from 'date-fns';
import { getCategoryDate } from '../../../utils/getCategoryDay';

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

const Conversation = ({ contact, index, isMinimized }) => {
  const dispatch = useDispatch();
  const conversation = useSelector((state) => selectConversationByContactId(state, contact.id));
  
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState('');

  const windowWidth = window.innerWidth;
  const maxConversations = Math.floor(windowWidth / 330);

  const closeConversation = (contactId) => {
    dispatch(closeWindow({ contactId }));
  };

  const minimizeConversation = (contactId) => {
    dispatch(minimizeWindow({ contactId }));
  };
  
  const sendMessage = () => {
    const msg = { user: 'User', message, conversationId: conversation._id };
    socket.emit('send_message', msg);
    setMessage('');
  };

  const formatTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'HH:mm');
  };

  useEffect(() => {
    socket.on('init', (msgs) => {
      setMessages(msgs);
    });

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('init');
      socket.off('receive_message');
    };
  }, []);
  
  useEffect(() => {
    if (conversation?.messages) setMessages(conversation?.messages);
    }, [conversation]);

  return (
    <div className={`fixed z-50 bottom-0 w-80 bg-white shadow-lg rounded-t-lg ${isMinimized ? 'h-12' : 'h-96'}`} style={{ right: `${(index % maxConversations) * 330 + 10}px`, bottom: isMinimized ? '-8px' : '40px' }}>
      <div className="flex items-center justify-between bg-blue-500 text-white rounded-t-lg cursor-pointer" onClick={() => minimizeConversation(contact.id)}>
        <span className='p-2'>{contact.username}</span>
        <div className='flex w-8 h-8 md:w-10 md:h-10 items-center justify-center'>
          <CloseConversation onClose={() => closeConversation(contact.id)} />
        </div>
      </div>
      {!isMinimized && (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-2 mb-2 space-y-2">
            {messages && messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">Aucun message pour l'instant</div>
            ) : (
              messages && messages.map((msg, index) => {
                const isSender = msg.senderId !== contact.id;
                const createdAtDate = getCategoryDate(msg.createdAt);
                const time = formatTime(msg.createdAt);

                return (
                  <React.Fragment key={index}>
                    {index === 0 || getCategoryDate(messages[index - 1].createdAt) !== createdAtDate ? (
                      <div className="text-center text-gray-500 my-2">
                        {createdAtDate}
                      </div>
                    ) : null}
                    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-2 rounded-lg ${isSender ? 'bg-blue-500 text-white text-right' : 'bg-gray-200 text-left'} shadow`}>
                        <div className="text-sm">{msg.content}</div>
                        <div className="text-xs text-gray-400 mt-1 flex justify-between">
                          <span>{time}</span>
                          {isSender && (
                            <span className="ml-2">
                              <i className={`fa-solid fa-check ${msg.read ? 'text-blue-500' : 'text-gray-400'}`}></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>
          <div className="flex items-center border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="p-2 px-4 bg-blue-500 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
