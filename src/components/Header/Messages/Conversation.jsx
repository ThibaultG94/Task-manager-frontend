import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

const Conversation = ({ contact, onClose, index }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

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

    const sendMessage = () => {
        const msg = { user: 'User', message };
        socket.emit('send_message', msg);
        setMessage('');
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const windowWidth = window.innerWidth;
    const maxConversations = Math.floor(windowWidth / 320);

    return (
        <div className={`fixed z-50 bottom-0 w-80 bg-white shadow-lg rounded-t-lg ${isMinimized ? 'h-12' : 'h-96'}`} style={{ right: `${(index % maxConversations) * 325}px`, bottom: isMinimized ? '0' : '40px' }}>
            <div className="flex items-center justify-between bg-gray-200 p-2 rounded-t-lg">
                <span>{contact.username}</span>
                <div className="flex space-x-2">
                    <button onClick={handleMinimize} className="px-2 py-1 text-xs bg-gray-400 rounded">{isMinimized ? 'Maximize' : 'Minimize'}</button>
                    <button onClick={onClose} className="px-2 py-1 text-xs bg-red-500 text-white rounded">Close</button>
                </div>
            </div>
            {!isMinimized && (
                <div className="flex flex-col h-full">
                    <div className="flex-grow overflow-y-auto mb-2">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-1">
                                <strong>{msg.user}:</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow p-2 border rounded-l"
                        />
                        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conversation;
