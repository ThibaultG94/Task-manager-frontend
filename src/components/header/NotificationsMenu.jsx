import React from 'react';

const NotificationsMenu = ({
	unreadNotifications,
	readedNotifications,
	onRead,
}) => {
	return (
		<div className="absolute top-full right-0 mt-2 max-h-96 w-80 bg-white rounded-md shadow-lg border-gray-200 z-10 overflow-hidden">
			<div className="overflow-y-auto max-h-80">
				{unreadNotifications.length === 0 &&
				readedNotifications.length > 0 ? (
					<div className="px-4 py-3 text-sm text-gray-600">
						Aucune nouvelle notification
					</div>
				) : (
					<>
						<p className="px-4 py-3 text-xs font-semibold text-gray-600">
							NOUVEAU
						</p>
						<ul>
							{unreadNotifications.map((notification, index) => (
								<li
									key={index}
									className={`px-4 py-2 h-16 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex ${
										notification.read ? 'opacity-50' : ''
									}`}
									onClick={() => onRead(notification.id)}>
									<span
										id="avatarLetter"
										className="text-light-blue text-2xl sm:text-3xl md:text-4xl">
										{/* {firstLetter} */}
									</span>
									<span className="flex-grow truncate">
										{notification.message}
									</span>
								</li>
							))}
						</ul>
						<p className="px-4 py-2 text-xs font-semibold text-gray-600">
							PLUS TÔT
						</p>
					</>
				)}
			</div>
			<div className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
				Voir toutes les notifications
			</div>
		</div>
	);
};

export default NotificationsMenu;
