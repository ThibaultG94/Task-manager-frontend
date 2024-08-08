import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectEarlierNotifications,
	selectNewNotifications,
} from '../../../store/selectors/notificationSelectors';
import { selectWorkspaces } from '../../../store/selectors/workspaceSelectors';
import { setEditedTask, setInitialEditedTask } from '../../../store/feature/tasks.slice';
import { setInitialEditedWorkspace } from '../../../store/feature/workspaces.slice';
import { useMarkNotificationsAsViewed } from '../../../api/notifications/useMarkNotificationsAsViewed';
import { useMarkNotificationAsRead } from '../../../api/notifications/useMarkNotificationAsRead';
import { useGetSentOutInvitations } from '../../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../../api/invitations/useGetReceivedInvitations';
import { useGetTask } from '../../../api/tasks/useGetTask';
import { useGetReceivedWorkspaceInvitations } from '../../../api/workspaceInvitations/useGetReceivedWorkspaceInvitations';
import { useGetSentOutWorkspaceInvitations } from '../../../api/workspaceInvitations/useGetSentOutWorkspaceInvitations';
import { formatTaskForEditing } from '../../../utils/formatTaskForEditing';
import useCheckIfEdited from '../../../utils/useCheckIfEdited';
import useCheckIfEditedWorkspace from '../../../utils/useCheckIfEditedWorkspace';
import NotificationsMenu from './NotificationsMenu';
import InviteMemberModal from '../../SideBar/InvitationModal/InviteMemberModal';
import HandleModalTask from '../../ModalTask/HandleModalTask';
import HandleModalWorkspace from '../../ModalWorkspace/HandleModalWorkspace';
import WorkspaceManageModal from '../../SideBar/ModalWorkspace/WorkspaceManageModal';
import { useOutsideClick } from '../../../utils/useOutsideClick';
import { useGetComments } from '../../../api/comments/useGetComments';

const HeaderNotifications = ({ userId }) => {
	const dispatch = useDispatch();
	const receivedNewNotifications = useSelector(selectNewNotifications);
	const receivedEarlierNotifications = useSelector(
		selectEarlierNotifications
	);
	const userWorkspaces = useSelector(selectWorkspaces);

	const markNotificationsAsViewed = useMarkNotificationsAsViewed();
	const markNotificationAsRead = useMarkNotificationAsRead();
	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const getReceivedWorkspaceInvitations = useGetReceivedWorkspaceInvitations();
	const getSentOutWorkspaceInvitations = useGetSentOutWorkspaceInvitations();
	const getTask = useGetTask();
	const getComments = useGetComments();

	const [hasNewNotification, setHasNewNotification] = useState(0);
	const [unreadNotifications, setUnreadNotifications] = useState([]);
	const [readedNotifications, setReadedNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedWorkspace, setSelectedWorkspace] = useState(null);
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isWorkspaceInvitationModalOpen, setIsWorkspaceInvitationModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalWorkspaceOpen, setIsModalWorkspaceOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
	const [tab, setTab] = useState('tab1');
	const [openNotificationsModal, setOpenNotificationsModal] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const modalRef = useRef(null);
    const bellRef = useRef(null);
	const onOutsideClick = useCallback(() => {
        closeHandler();
    }, []);

    useOutsideClick(modalRef, bellRef, onOutsideClick, showNotifications);

	const checkIfEdited = useCheckIfEdited({
		setIsModalOpen,
		setIsEditing,
		selectedTask,
		formatTaskForEditing,
		setInitialEditedTask,
	});

	const checkIfEditedWorkspace = useCheckIfEditedWorkspace({
		setIsModalWorkspaceOpen,
		setIsEditingWorkspace,
		selectedWorkspace,
	});

	const markAsViewed = async (notificationsIds) => {		
		await markNotificationsAsViewed(userId, notificationsIds);
	};

	const getTaskDetails = async (taskId) => {
		const task = await getTask(taskId);
		setSelectedTask(task);
		dispatch(setEditedTask(task));
		setIsModalOpen(true);
	};

	const getWorkspaceDetails = async (workspaceId) => {
		const workspace = userWorkspaces.find(
			(workspace) => workspace._id === workspaceId
		);
		const formattedWorkspace = {
			_id: workspace._id,
			title: workspace.title,
			description: workspace.description,
			members: workspace.members,
			membersName: workspace.members.map((member) => member?.username),
			creator: workspace.creator,
			createdAt: workspace.createdAt,
			updatedAt: workspace.updatedAt,
		};
		setSelectedWorkspace(formattedWorkspace);
		dispatch(setInitialEditedWorkspace(formattedWorkspace));
		setIsModalWorkspaceOpen(true);
	};

	const markAsRead = async (notification) => {
		if (!notification.read) {
			await markNotificationAsRead(userId, notification._id);
		}
		switch (notification.type) {
			case 'invitationUpdate':
				setIsInvitationModalOpen(true);
				break;
			case 'workspaceInvitation':
				getReceivedWorkspaceInvitations(userId);
				getSentOutWorkspaceInvitations(userId);
				setIsWorkspaceInvitationModalOpen(true);
				break;
			case 'taskUpdate':
				getTaskDetails(notification.taskId);
				break;
			case 'taskCreation':
				getTaskDetails(notification.taskId);
				break;
			case 'taskDeletion':
				setOpenNotificationsModal(true);
				break;
			case 'workspaceUpdate':
				getWorkspaceDetails(notification.workspaceId);
				break;
			case 'workspaceDeletion':
				setOpenNotificationsModal(true);
				break;
			case 'newComment':
				getTaskDetails(notification.taskId);
				break;
			case 'replycomment':
				getTaskDetails(notification.taskId);
				break;
			default:
				console.error('Notification type not found');
		}
		if (notification.type === 'invitationUpdate') {
			if (notification.message.includes('envoyé')) {
				setTab('tab4');
			} else if (notification.message.includes('accepté')) {
				setTab('tab3');
			} else {
				console.error("Can't find tab");
			}
		} else if (notification.type === 'workspaceInvitation') {
			if (notification.message.includes('rejoindre')) {
				setTab('tab3');
			} else if (notification.message.includes('rejoint')) {
				setTab('tab2');
			} else {
				console.error("Can't find tab");
			}
		}
	};

	const showNotificationsRef = useRef(showNotifications);
	useEffect(() => {
		showNotificationsRef.current = showNotifications;
	}, [showNotifications]);

	const handleNotificationsMenu = (event) => {
		event.stopPropagation();
		if (!showNotificationsRef.current) {
			setIsClosing(false);
			setShowNotifications(true);
			const viewedNotificationsIds = unreadNotifications
				.filter((notif) => !notif.viewedAt)
				.map((notif) => notif._id);
				if (viewedNotificationsIds.length > 0) {
					markAsViewed(viewedNotificationsIds);
				}
		} else {
			closeHandler();
		}
	};

	const closeModal = async () => {
		await checkIfEdited();
	};

	const closeModalWorkspace = async () => {
		await checkIfEditedWorkspace();
	};

	const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
			setShowNotifications(false);
        }, 300);
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
			}
			if (selectedTask) await getComments(selectedTask?._id);
		};
		resetEditedTask();
	}, [selectedTask]);

	return (
		<div
			className="flex relative mr-2 sm:mr-4 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center"
			onClick={(e) => handleNotificationsMenu(e)} ref={bellRef}>
			<span className="cursor-pointer text-dark-blue text-2xl sm:text-3xl">
				<i className="fa-regular fa-bell"></i>
			</span>
			{hasNewNotification > 0 && (
				<span className="absolute top-0 sm:top-1 md:top-0 md:bottom-5 left-3.5 sm:left-4 h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 bg-red-500 rounded-full flex items-center justify-center">
					<span className="text-white text-[0.5rem] sm:text-xs font-semibold flex items-center justify-center">
						{hasNewNotification < 100 ? hasNewNotification : '99+'}
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
					modalRef={modalRef}
					isClosing={isClosing}
				/>
			)}

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={tab}
				/>
			)}

			{isWorkspaceInvitationModalOpen && (
				<WorkspaceManageModal
					userId={userId}
					setIsWorkspaceModalOpen={setIsWorkspaceInvitationModalOpen}
					tab={tab}
			/>
			)}

			{isModalOpen && (
				<HandleModalTask
					closeModal={closeModal}
					setIsModalOpen={setIsModalOpen}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			)}

			{isModalWorkspaceOpen && (
				<HandleModalWorkspace
					closeModalWorkspace={closeModalWorkspace}
					setIsModalWorkspaceOpen={setIsModalWorkspaceOpen}
					isEditingWorkspace={isEditingWorkspace}
					setIsEditingWorkspace={setIsEditingWorkspace}
					selectedWorkspace={selectedWorkspace}
					userId={userId}
					isModalWorkspaceOpen={isModalWorkspaceOpen}
				/>
			)}
		</div>
	);
};

export default HeaderNotifications;
