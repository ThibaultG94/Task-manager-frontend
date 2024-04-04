import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectEarlierNotifications,
	selectNewNotifications,
} from '../../store/selectors/notificationSelectors';
import { setEditedTask, setInitialEditedTask } from '../../store/feature/tasks.slice';
import { useMarkNotificationsAsViewed } from '../../api/notifications/useMarkNotificationsAsViewed';
import { useMarkNotificationAsRead } from '../../api/notifications/useMarkNotificationAsRead';
import { useGetSentOutInvitations } from '../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/useGetReceivedInvitations';
import { useGetTask } from '../../api/tasks/useGetTask';
import NotificationsMenu from './NotificationsMenu';
import InviteMemberModal from '../SideBar/InvitationModal/InviteMemberModal';
import HandleModalTask from '../ModalTask/HandleModalTask';
import useCheckIfEdited from '../../utils/useCheckIfEdited';
import { formatTaskForEditing } from '../../utils/formatTaskForEditing';

const HeaderNotifications = ({ userId }) => {
	const dispatch = useDispatch();
	const receivedNewNotifications = useSelector(selectNewNotifications);
	const receivedEarlierNotifications = useSelector(
		selectEarlierNotifications
	);
	const markNotificationsAsViewed = useMarkNotificationsAsViewed();
	const markNotificationAsRead = useMarkNotificationAsRead();
	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const getTask = useGetTask();
	const [hasNewNotification, setHasNewNotification] = useState(0);
	const [unreadNotifications, setUnreadNotifications] = useState([]);
	const [readedNotifications, setReadedNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [tab, setTab] = useState('tab1');
	const [openNotificationsModal, setOpenNotificationsModal] = useState(false);

	const checkIfEdited = useCheckIfEdited({
		setIsModalOpen,
		setIsEditing,
		selectedTask,
		formatTaskForEditing,
		setInitialEditedTask,
	});

	const markAsViewed = async (notificationsIds) => {
		await markNotificationsAsViewed(userId, notificationsIds);
	};

	const getTaskDetails = async (taskId) => {
		const task = await getTask(taskId);
		setSelectedTask(task);
		dispatch(setEditedTask(task));
		setIsTaskModalOpen(true);
	};

	const markAsRead = async (notification) => {
		if (!notification.read) {
			await markNotificationAsRead(userId, notification._id);
		}
		switch (notification.type) {
			case 'invitationUpdate':
				setIsInvitationModalOpen(true);
				break;
			case 'taskUpdate':
				getTaskDetails(notification.taskId);
				break;
			case 'taskCreation':
				getTaskDetails(notification.taskId);
				break;
			case 'taskDelation':
				setOpenNotificationsModal(true);
				console.log('Task deleted');
				break;
			case 'workspaceUpdate':
				setIsWorkspaceModalOpen(true);
				break;
			default:
				console.error('Notification type not found');
		}
		if (notification.type === 'invitationUpdate') {
			if (notification.message.includes('envoyé')) {
				setTab('tab3');
			} else if (notification.message.includes('accepté')) {
				setTab('tab2');
			} else {
				console.error("Can't find tab");
			}
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

	const closeModal = async () => {
		await checkIfEdited();
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

	useEffect(() => {
		const resetEditedTask = async () => {
			const formattedTask = await formatTaskForEditing(selectedTask);
			if (formattedTask) {
				dispatch(setInitialEditedTask(formattedTask));
				console.log('resetEditedTask', formattedTask);
			}
		};
		resetEditedTask();
	}, [selectedTask]);

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
					openNotificationsModal={openNotificationsModal}
					setOpenNotificationsModal={setOpenNotificationsModal}
				/>
			)}

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={tab}
				/>
			)}

			{isTaskModalOpen && (
				<HandleModalTask
					closeModal={closeModal}
					setIsModalOpen={setIsTaskModalOpen}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			)}
		</div>
	);
};

export default HeaderNotifications;
