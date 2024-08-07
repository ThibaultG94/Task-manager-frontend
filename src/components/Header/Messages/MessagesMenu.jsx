import React, { useEffect } from 'react';
import { useMarkConversationAsRead } from '../../../api/conversations/useMarkConversationAsRead';
import useOpenConversation from '../../../hooks/useOpenConversation';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import AvatarContact from '../../Cloudinary/AvatarContact';

const MessagesMenu = ({ modalRef, conversations, userId, isClosing }) => {
    const openConversation = useOpenConversation();
    const readConversation = useMarkConversationAsRead();

    const formatDateToNow = (dateString) => {
        return formatDistanceToNow(parseISO(dateString), {
            addSuffix: true,
            locale: fr,
        });
    };

    const processConversation = async (e, conv) => {
        await readConversation(conv._id);
        const user = conv.users.find(user => user._id !== userId);
        const contact = {
            ...user,
            id: user._id,
        };
        openConversation(e, contact);
    };

    useEffect(() => {
        const currentModal = modalRef.current;
        if (currentModal) {
            if (!isClosing) {
                currentModal.classList.add('slideDownNotif');
                currentModal.classList.remove('slideUpNotif');
            } else {
                currentModal.classList.add('slideUpNotif');
                currentModal.classList.remove('slideDownNotif');
            }
        }
    }, [isClosing]);

    return (
        <div
            className={`absolute top-full right-0 w-80 bg-white rounded-md shadow-lg border-gray-200 z-10 overflow-hidden pt-2 select-none transition-all duration-300`}
            onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <div className="overflow-y-auto overflow-x-hidden max-h-96">
                {conversations && conversations.length === 0 ? (
                    <div className="px-4 pb-2.5 text-sm text-gray-600">
                        Vous n'avez aucun message
                    </div>
                ) : (
                    <ul>
                        {conversations.map((conv) => {
                            const lastMessage = conv.messages[conv.messages?.length - 1];
                            const hasUnreadMessages = conv.messages.some(msg => !msg?.read && msg?.guestId === userId);
                            const unreadMessagesCount = conv.messages.filter(msg => !msg.read && msg.guestId === userId).length;
                            const otherUser = conv.users.find(user => user._id !== userId);

                            return (
                                <li
                                    key={conv._id}
                                    className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
                                        hasUnreadMessages ? 'font-bold' : ''
                                    }`}
                                    onClick={(e) => processConversation(e, conv)}>
                                    <div className="flex flex-1 items-center space-x-2 ellipsis relative">
                                        <div className="bg-dark-blue-2 flex h-9 items-center justify-center mx-auto overflow-hidden relative rounded-full w-9">
                                            <AvatarContact user={otherUser} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <span className="block truncate">
                                                {lastMessage.content}
                                            </span>
                                            <span className="block text-xs text-gray-400 mt-1 truncate">
                                                {formatDateToNow(lastMessage.createdAt)}
                                            </span>
                                        </div>
                                        {lastMessage.senderId === userId && (
                                            <i className={`fa-solid ${lastMessage.read ? 'fa-check-double text-green-300' : 'fa-check text-gray-300'}`}></i>
                                        )}
                                        {unreadMessagesCount > 0 && (
                                            <span className="absolute top-0 right-0 h-4 w-4 p-3 bg-red-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-base font-semibold">
                                                    {unreadMessagesCount < 100 ? unreadMessagesCount : '99+'}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MessagesMenu;
