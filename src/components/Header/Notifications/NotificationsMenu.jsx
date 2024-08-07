import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import NotificationsModal from './NotificationsModal';
import AvatarContact from '../../Cloudinary/AvatarContact';

const NotificationsMenu = ({
	unreadNotifications,
	readedNotifications,
	setShowNotifications,
	onRead,
	openNotificationsModal,
	setOpenNotificationsModal,
	modalRef,
	isClosing,
}) => {
	const [isClosingModal, setIsClosingModal] = useState(false);

	const handleNotificationsModal = () => {
		if (openNotificationsModal) {
			closeHandler();
		} else {
			setIsClosingModal(false);
			setOpenNotificationsModal(true);
		}
	};

	const closeHandler = () => {
        setIsClosingModal(true);
        setTimeout(() => {
			setOpenNotificationsModal(false);
			setShowNotifications(false);
        }, 300);
    };

	const formatDateToNow = (dateString) => {
		return formatDistanceToNow(parseISO(dateString), {
			addSuffix: true,
			locale: fr,
		});
	};

	useEffect(() => {
        const currentModal = modalRef.current;
        if (currentModal) {
            if (!isClosing) {
                currentModal.classList.add('slideDownNotif');
                currentModal.classList.remove('slideUpNotif');
            } else {
                currentModal.classList.add('slideUpNotif');
                currentModal.classList.remove('slideDownNotif');
            }
        }
    }, [isClosing]);

	return (
		<>
		<div
			className="absolute top-full right-0 w-80 bg-white rounded-md shadow-lg border-gray-200 z-10 overflow-hidden pt-2 select-none"
			onClick={(e) => e.stopPropagation()} ref={modalRef}>
			<div className="overflow-y-auto overflow-x-hidden max-h-96">
				{unreadNotifications.length === 0 &&
				readedNotifications.length === 0 ? (
					<div className="px-4 pb-2.5 text-sm text-gray-600">
						Aucune nouvelle notification
					</div>
				) : (
					<>
						{unreadNotifications.length > 0 && (
							<p className="px-4 py-2.5 text-xs font-semibold text-gray-600">
								NOUVEAU
							</p>
						)}
						<ul>
							{unreadNotifications.map((notification) => (
								<li
								key={notification._id}
								className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
									notification.read
									? 'opacity-50'
									: 'font-bold'
								} ${
									!notification.viewedAt
									? 'bg-gray-100'
									: 'bg-white'
								}`}
								onClick={() => onRead(notification)}>
									<div className="flex flex-1 items-center space-x-2 ellipsis">
										<div className="bg-dark-blue-2 flex h-9 items-center justify-center mx-auto overflow-hidden rounded-full w-9">
											<AvatarContact user={notification} />
										</div>
										<div className="flex-1 overflow-hidden">
											<span className="block truncate">
												{notification.message}
											</span>
											<span className="block text-xs text-gray-400 mt-1 truncate">
												{formatDateToNow(
													notification.createdAt
												)}
											</span>
										</div>
									</div>
								</li>
							))}
						</ul>
						<>
							{readedNotifications.length > 0 && (
								<p className="px-4 py-2 text-xs font-semibold text-gray-600">
									PLUS TÔT
								</p>
							)}
							<ul>
								{readedNotifications.map(
									(notification) => (
										<li
										key={notification._id}
										className={`px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${
											notification.read
											? 'opacity-50'
											: 'font-bold'
										} ${
											!notification.viewedAt
											? 'bg-gray-100'
											: 'bg-white'
										}`}
										onClick={() =>
											onRead(notification)
										}>
											<div className="flex flex-1 items-center space-x-2 ellipsis">
												<div className="bg-dark-blue-2 flex h-9 items-center justify-center mx-auto overflow-hidden rounded-full w-9">
													<AvatarContact user={notification} />
												</div>
												<div className="flex-1 overflow-hidden">
													<span className="block truncate">
														{notification.message}
													</span>
													<span className="block text-xs text-gray-400 mt-1 truncate">
														{formatDateToNow(
															notification.createdAt
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
			<div
				className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
				onClick={handleNotificationsModal}>
				Voir toutes les notifications
			</div>
		</div>
		{openNotificationsModal && (
			<NotificationsModal
				formatDateToNow={formatDateToNow}
				handleNotificationsModal={handleNotificationsModal}
				openNotificationsModal={openNotificationsModal}
				onRead={onRead}
				isClosingModal={isClosingModal}
			/>
		)}
	</>
	);
};

export default NotificationsMenu;
