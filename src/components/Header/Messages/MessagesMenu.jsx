import React, { useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessagesMenu = ({ modalRef, conversations, onRead, userId, isClosing }) => {
    const formatDateToNow = (dateString) => {
		return formatDistanceToNow(parseISO(dateString), {
			addSuffix: true,
			locale: fr,
		});
	};

	useEffect(() => {
        const currentModal = modalRef.current;
        if (currentModal) {
            currentModal.style.animation = `${isClosing ? 'slideUpNotif' : 'slideDownNotif'} 0.3s forwards`;
        }
    }, [isClosing]);

    return (
        <div
			className="absolute top-full right-0 w-80 bg-white rounded-md shadow-lg border-gray-200 z-10 overflow-hidden pt-2 select-none"
			onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <div className="overflow-y-auto overflow-x-hidden max-h-96">
            {conversations && conversations.length === 0 ? (
					<div className="px-4 pb-2.5 text-sm text-gray-600">
						Vous n'avez aucun message
					</div>
				) : (
					<ul>
						{conversations.map((conv) => {
							const lastMessage = conv.messages[conv.messages.length - 1];
							const hasUnreadMessages = conv.messages.some(msg => !msg.read && msg.guestId === userId);
							const otherUser = conv.users.find(user => user._id !== userId);

							return (
								<li
									key={conv._id}
									className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
										hasUnreadMessages ? 'font-bold' : ''
									}`}
									onClick={() => onRead(conv._id)}>
									<div className="flex flex-1 items-center space-x-2 ellipsis">
										<div className="bg-dark-blue flex h-10 items-center justify-center mx-auto overflow-hidden p-2 relative rounded-full w-10">
											<span
												id="avatarLetterNotif"
												className="text-lg text-white">
												{
													otherUser?.username[0]
												}
											</span>
										</div>
										<div className="flex-1 overflow-hidden">
											<span className="block truncate">
												{lastMessage.content}
											</span>
											<span className="block text-xs text-gray-400 mt-1 truncate">
												{formatDateToNow(lastMessage.createdAt)}
											</span>
										</div>
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
