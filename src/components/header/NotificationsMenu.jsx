import React from 'react';

const NotificationsMenu = ({ notifications, onRead }) => {
	return (
		<div className="absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
			{notifications.length === 0 ? (
				<div className="px-4 py-2 text-sm text-gray-700">
					Aucune nouvelle notification
				</div>
			) : (
				notifications.map((notification, index) => (
					<div
						key={index}
						className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
							notification.read ? 'opacity-50' : ''
						}`}
						onClick={() => onRead(notification.id)}>
						{notification.message}
					</div>
				))
			)}
		</div>
	);
};

export default NotificationsMenu;
