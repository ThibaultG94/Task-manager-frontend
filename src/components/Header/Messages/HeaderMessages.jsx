import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGetConversations } from '../../../api/conversations/useGetConversations';
import { useOutsideClick } from '../../../utils/useOutsideClick';
import MessagesMenu from './MessagesMenu';

const HeaderMessages = () => {
	const getConversations = useGetConversations();

    const [showMessages, setShowMessages] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
	const [readedMessages, setReadedMessages] = useState([]);
    const [hasNewMessage, setHasNewMessage] = useState(0);
    
	const modalRef = useRef(null);
    const messageRef = useRef(null);
    const showMessagesRef = useRef(showMessages);

	const onOutsideClick = useCallback(() => {
        closeHandler();
    }, []);

    useOutsideClick(modalRef, messageRef, onOutsideClick, showMessages);

    const markAsViewed = async (messagesIds) => {
		// await markNotificationsAsViewed(userId, messagesIds);
	};

    const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
			setShowMessages(false);
        }, 300);
    };

    const handleMessagesMenu = (event) => {
		event.stopPropagation();
		if (!showMessagesRef.current) {
			setIsClosing(false);
			setShowMessages(true);
			const viewedMessagesIds = unreadMessages
				.filter((notif) => !notif.viewedAt)
				.map((notif) => notif._id);
				if (viewedMessagesIds.length > 0) {
					markAsViewed(viewedMessagesIds);
				}
		} else {
			closeHandler();
		}
	};

	const markAsRead = async (message) => {
		console.log(message);
	};

	useEffect(() => {
		getConversations();
	}, []);

    useEffect(() => {
		showMessagesRef.current = showMessages;
	}, [showMessages]);

    return (
        <div className="flex relative mr-3 sm:mr-5 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center" onClick={(e) => handleMessagesMenu(e)} 
        ref={messageRef}>
            <span className="cursor-pointer text-dark-blue text-2xl sm:text-3xl">
                <i className="fa-regular fa-envelope"></i>
			</span>
            {hasNewMessage > 0 && (
				<span className="absolute top-0 sm:top-1 md:top-0 md:bottom-5 left-3.5 sm:left-4 h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 bg-red-500 rounded-full flex items-center justify-center">
					<span className="text-white text-[0.5rem] sm:text-xs font-semibold flex items-center justify-center">
						{hasNewMessage < 100 ? hasNewMessage : '99+'}
					</span>
				</span>
			)}
			{showMessages && (
				<MessagesMenu modalRef={modalRef} unreadMessages={unreadMessages} readedMessages={readedMessages} onRead={markAsRead} />
			)}
        </div>
    );
};

export default HeaderMessages;