import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import { markConversationAsRead } from '../../store/feature/conversations.slice';
import { useSocket } from '../../context/SocketContext';
import { useGetConversations } from '../../api/conversations/useGetConversations';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderNotifications from './Notifications/HeaderNotifications';
import HeaderAvatar from './HeaderAvatar';
import HeaderMessages from './Messages/HeaderMessages';
import { addMessageToConversation } from '../../store/feature/conversations.slice';

const Header = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const socket = useSocket();
	const getConversations = useGetConversations();

	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (currentUser) {
			setUserId(currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {
        getConversations();
    }, [userId]);

	useEffect(() => {
		if (socket) {
		  socket.on('receive_message', (message) => {
			dispatch(addMessageToConversation({ conversationId: message.conversationId, msg: message }));
		  });

		  socket.on('message_read', ({ conversationId, userId }) => {
			dispatch(markConversationAsRead({ conversationId, userId }));
		  });
	
		  return () => {
			socket.off('receive_message');
			socket.off('message_read');
		  };
		}
	  }, [socket]);

	return (
		<header className="h-10 md:h-16 mx-auto py-2 relative w-full">
			<HeaderWelcome currentUser={currentUser} />
			<HeaderNav />
			<div className="absolute flex h-full items-center right-0 top-0">
				{/* <HeaderSearch /> */}
				<div className="flex">
					<HeaderMessages userId={userId} />
					<HeaderNotifications userId={userId} />
					<HeaderAvatar currentUser={currentUser} />
				</div>
			</div>
		</header>
	);
};

export default Header;
