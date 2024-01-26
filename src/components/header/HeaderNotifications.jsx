import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	selectEarlierNotifications,
	selectNewNotifications,
} from '../../store/selectors/notificationSelectors';
import NotificationsMenu from './NotificationsMenu';
import { useMarkNotificationsAsViewed } from '../../api/notifications/markNotificationsAsViewed';
import { useMarkNotificationAsRead } from '../../api/notifications/markNotificationAsRead';
import InviteMemberModal from '../invitation/InviteMemberModal';
import { useGetSentOutInvitations } from '../../api/invitations/getSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/getReceivedInvitations';

const HeaderNotifications = ({ userId }) => {
	const markNotificationsAsViewed = useMarkNotificationsAsViewed();
	const markNotificationAsRead = useMarkNotificationAsRead();
	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const [hasNewNotification, setHasNewNotification] = useState(0);
	const receivedNewNotifications = useSelector(selectNewNotifications);
	const receivedEarlierNotifications = useSelector(
		selectEarlierNotifications
	);
	const [unreadNotifications, setUnreadNotifications] = useState([]);
	const [readedNotifications, setReadedNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [tab, setTab] = useState('tab1');

	const markAsViewed = async (notificationsIds) => {
		await markNotificationsAsViewed(userId, notificationsIds);
	};

	const markAsRead = async (notification) => {
		if (!notification.read)
			await markNotificationAsRead(userId, notification._id);
		setIsInvitationModalOpen(true);
		if (notification.message.includes('envoyé')) {
			setTab('tab3');
		} else if (notification.message.includes('accepté')) {
			setTab('tab2');
		} else {
			console.error("Can't find tab");
		}
	};

	const handleNotificationsMenu = () => {
		if (showNotifications) {
			setShowNotifications(false);
			const viewedNotificationsIds = unreadNotifications
				.filter((notif) => !notif.viewedAt)
				.map((notif) => notif._id);
			if (viewedNotificationsIds.length > 0) {
				markAsViewed(viewedNotificationsIds);
			}
		} else if (!showNotifications) {
			setShowNotifications(true);
		}
	};

	useEffect(() => {
		if (receivedNewNotifications && receivedNewNotifications.length > 0) {
			const unviewedCount = receivedNewNotifications.filter(
				(notif) => !notif.viewedAt
			).length;
			setHasNewNotification(unviewedCount);
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

	useEffect(() => {
		if (userId) {
			getSentOutInvitations(userId);
			getReceivedInvitations(userId);
		}
	}, [isInvitationModalOpen]);

	return (
		<div
			className="flex relative mr-2 sm:mr-4 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center"
			onClick={handleNotificationsMenu}>
			<span className="cursor-pointer text-dark-blue text-2xl sm:text-3xl">
				<i className="fa-regular fa-bell"></i>
			</span>
			{hasNewNotification > 0 && (
				<span className="absolute top-0.5 sm:top-1 left-3 sm:left-4	h-3 sm:h-4 md:h-4 w-3 sm:w-4 md:w-4 bg-red-500 rounded-full flex items-center justify-center">
					<span className="text-white text-[0.6rem] sm:text-xs font-semibold flex items-center justify-center">
						{hasNewNotification}
					</span>
				</span>
			)}

			{showNotifications && (
				<NotificationsMenu
					unreadNotifications={unreadNotifications}
					readedNotifications={readedNotifications}
					setShowNotifications={setShowNotifications}
					onRead={markAsRead}
				/>
			)}

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={tab}
				/>
			)}
		</div>
	);
};

export default HeaderNotifications;
