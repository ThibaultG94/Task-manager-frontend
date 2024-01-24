import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	selectEarlierNotifications,
	selectNewNotifications,
	selectNotifications,
} from '../../store/selectors/notificationSelectors';
import NotificationsMenu from './NotificationsMenu';
import { useMarkNotificationsAsViewed } from '../../api/notifications/markNotificationsAsViewed';

const HeaderNotifications = ({ userId }) => {
	const markNotificationsAsViewed = useMarkNotificationsAsViewed();
	const [hasNewNotification, setHasNewNotification] = useState(false);
	const receivedNotifications = useSelector(selectNotifications);
	const receivedNewNotifications = useSelector(selectNewNotifications);
	const receivedEarlierNotifications = useSelector(
		selectEarlierNotifications
	);
	const [unreadNotifications, setUnreadNotifications] = useState([]);
	const [readedNotifications, setReadedNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);

	const markAsViewed = async (notificationsIds) => {
		await markNotificationsAsViewed(userId, notificationsIds);
	};

	const markAsRead = (notificationId) => {
		// Tu dois implémenter la logique pour marquer une notification comme lue
		console.log(`Notification ${notificationId} marquée comme lue`);
		// N'oublie pas de mettre à jour ton state après
	};

	const handleNotificationsMenu = () => {
		if (showNotifications) {
			setShowNotifications(false);
		} else if (!showNotifications) {
			setShowNotifications(true);
			const viewedNotificationsIds = unreadNotifications
				.filter((notif) => !notif.viewedAt)
				.map((notif) => notif._id);
			if (viewedNotificationsIds.length > 0) {
				markAsViewed(viewedNotificationsIds);
			}
		}
	};

	// useEffect(() => {
	// 	if (receivedNotifications && receivedNotifications.length > 0) {
	// 		const unread = receivedNotifications.filter(
	// 			(notification) => notification.read === false
	// 		);
	// 		const readed = receivedNotifications.filter(
	// 			(notification) => notification.read === true
	// 		);
	// 		setUnreadNotifications(unread);
	// 		setReadedNotifications(readed);
	// 	}
	// }, [receivedNotifications]);

	useEffect(() => {
		if (receivedNewNotifications && receivedNewNotifications.length > 0) {
			setHasNewNotification(true);
			setUnreadNotifications(receivedNewNotifications);
		}
	}, [receivedNewNotifications]);

	useEffect(() => {
		if (
			receivedEarlierNotifications &&
			receivedEarlierNotifications.length > 0
		) {
			setReadedNotifications(receivedEarlierNotifications);
		}
	}, [receivedEarlierNotifications]);

	return (
		<div
			className="cursor-pointer flex relative mr-4 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center"
			onClick={handleNotificationsMenu}>
			<span className="text-dark-blue text-xl sm:text-2xl md:text-3xl">
				<i className="fa-regular fa-bell"></i>
			</span>
			{hasNewNotification && (
				<span className="absolute top-2 sm:top-2.5 right-0 h-1.5 sm:h-2 md:h-2.5 w-1.5 sm:w-2 md:w-2.5 bg-red-500 rounded-full"></span>
			)}
			{showNotifications && (
				<NotificationsMenu
					unreadNotifications={unreadNotifications}
					readedNotifications={readedNotifications}
					onRead={markAsRead}
				/>
			)}
		</div>
	);
};

export default HeaderNotifications;
