import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessagesMenu = ({ modalRef, unreadMessages, readedMessages, onRead }) => {
    const formatDateToNow = (dateString) => {
		return formatDistanceToNow(parseISO(dateString), {
			addSuffix: true,
			locale: fr,
		});
	};

    return (
        <div
			className="absolute top-full right-0 w-80 bg-white rounded-md shadow-lg border-gray-200 z-10 overflow-hidden pt-2 select-none"
			onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <div className="overflow-y-auto overflow-x-hidden max-h-96">
            {unreadMessages.length === 0 &&
				readedMessages.length === 0 ? (
					<div className="px-4 pb-2.5 text-sm text-gray-600">
						Vous n'avez aucun message
					</div>
				) : (
					<>
						{unreadMessages.length > 0 && (
							<p className="px-4 py-2.5 text-xs font-semibold text-gray-600">
								NOUVEAU
							</p>
						)}
						<ul>
							{unreadMessages.map((message) => (
								<li
									key={message._id}
									className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
										message.read
											? 'opacity-50'
											: 'font-bold'
									} ${
										!message.viewedAt
											? 'bg-gray-100'
											: 'bg-white'
									}`}
									onClick={() => onRead(message)}>
									<div className="flex flex-1 items-center space-x-2 ellipsis">
										<div className="bg-dark-blue flex h-10 items-center justify-center mx-auto overflow-hidden p-2 relative rounded-full w-10">
											<span
												id="avatarLetterNotif"
												className="text-lg text-white">
												{
													message
														.creatorUsername[0]
												}
											</span>
										</div>
										<div className="flex-1 overflow-hidden">
											<span className="block truncate">
												{message.message}
											</span>
											<span className="block text-xs text-gray-400 mt-1 truncate">
												{formatDateToNow(
													message.createdAt
												)}
											</span>
										</div>
									</div>
								</li>
							))}
						</ul>
						<>
							{readedMessages.length > 0 && (
								<p className="px-4 py-2 text-xs font-semibold text-gray-600">
									PLUS TÔT
								</p>
							)}
							<ul>
								{readedMessages.map(
									(message) => (
										<li
											key={message._id}
											className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
												message.read
													? 'opacity-50'
													: 'font-bold'
											} ${
												!message.viewedAt
													? 'bg-gray-100'
													: 'bg-white'
											}`}
											onClick={() =>
												onRead(message)
											}>
											<div className="flex flex-1 items-center space-x-2 ellipsis">
												<div className="bg-dark-blue flex h-10 items-center justify-center mx-auto overflow-hidden p-2 relative rounded-full w-10">
													<span
														id="avatarLetterNotif"
														className="text-lg text-white">
														{
															message
																.creatorUsername[0]
														}
													</span>
												</div>
												<div className="flex-1 overflow-hidden">
													<span className="block truncate">
														{message.message}
													</span>
													<span className="block text-xs text-gray-400 mt-1 truncate">
														{formatDateToNow(
															message.createdAt
														)}
													</span>
												</div>
											</div>
										</li>
									)
								)}
							</ul>
						</>
					</>
				)}
            </div>
        </div>
    );
};

export default MessagesMenu;