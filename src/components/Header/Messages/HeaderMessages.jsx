import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetConversations } from '../../../api/conversations/useGetConversations';
import { useOutsideClick } from '../../../utils/useOutsideClick';
import MessagesMenu from './MessagesMenu';
import { setConversations, markConversationAsRead } from '../../../store/feature/conversations.slice';
import { selectConversations } from '../../../store/selectors/conversationsSelectors';
import getUserId from '../../../api/users/getUserId';

const HeaderMessages = () => {
	const getConversations = useGetConversations();
    const dispatch = useDispatch();
    const conversations = useSelector(selectConversations);

    const [showMessages, setShowMessages] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
	const [userId, setUserId] = useState(null);

    const modalRef = useRef(null);
    const messageRef = useRef(null);
    const showMessagesRef = useRef(showMessages);

	const onOutsideClick = useCallback(() => {
        closeHandler();
    }, []);

    useOutsideClick(modalRef, messageRef, onOutsideClick, showMessages);

    const markAsRead = async (conversationId) => {
		dispatch(markConversationAsRead(conversationId));
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
		} else {
			closeHandler();
		}
	};

	useEffect(() => {
		getConversations();
	}, []);

	useEffect(() => {
		if (conversations.length > 0) {
			const id = getUserId();
			setUserId(id);
			const sortedConvs = conversations
				.filter(conv => conv.messages.length > 0)
				.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
			setSortedConversations(sortedConvs);

			const unreadMsgCount = sortedConvs.reduce((count, conv) => 
				count + conv.messages.filter(msg => !msg.read && msg.guestId === userId).length, 0
			);
			setUnreadCount(unreadMsgCount);
		}
	}, [conversations]);

	useEffect(() => {
		showMessagesRef.current = showMessages;
	}, [showMessages]);

    return (
        <div className="flex relative mr-3 sm:mr-5 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center" onClick={(e) => handleMessagesMenu(e)} 
        ref={messageRef}>
            <span className="cursor-pointer text-dark-blue text-2xl sm:text-3xl">
                <i className="fa-regular fa-envelope"></i>
			</span>
            {unreadCount > 0 && (
				<span className="absolute top-0 sm:top-1 md:top-0 md:bottom-5 left-3.5 sm:left-4 h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 bg-red-500 rounded-full flex items-center justify-center">
					<span className="text-white text-[0.5rem] sm:text-xs font-semibold flex items-center justify-center">
						{unreadCount < 100 ? unreadCount : '99+'}
					</span>
				</span>
			)}
			{showMessages && (
				<MessagesMenu modalRef={modalRef} conversations={sortedConversations} onRead={markAsRead} userId={userId} />
			)}
        </div>
    );
};

export default HeaderMessages;
