import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { closeWindow, minimizeWindow } from '../../../store/feature/conversationWindows.slice';
import CloseConversation from '../../Buttons/CloseConversation';

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

const Conversation = ({ contact, index, isMinimized }) => {
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
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
        const msg = { user: 'User', message };
        socket.emit('send_message', msg);
        setMessage('');
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
                    <div className="flex-grow overflow-y-auto mb-2">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-4">Aucun message pour l'instant</div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className="mb-1">
                                    <strong>{msg.user}:</strong> {msg.message}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tapez votre message..."
                            className="flex-grow p-2 border rounded-l"
                        />
                        <button onClick={sendMessage} className="p-2 px-4 bg-blue-500 text-white rounded-r">
                        <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conversation;
