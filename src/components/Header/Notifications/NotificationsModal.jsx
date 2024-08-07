import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentNotificationsPage } from '../../../store/selectors/pagesSelectors';
import {
	selectIsNotificationsLoaded,
	selectNotifications,
	selectTotalNumberOfNotifications,
} from '../../../store/selectors/notificationSelectors';
import { useGetUserId } from '../../../api/users/useGetUserId';     
import { useGetAllNotifications } from '../../../api/notifications/useGetAllNotifications';
import Pagination from '../../../utils/Pagination';
import AvatarContact from '../../Cloudinary/AvatarContact';

const NotificationsModal = ({
	formatDateToNow,
	handleNotificationsModal,
	openNotificationsModal,
	onRead,
	isClosingModal,
}) => {
	const currentNotifications = useSelector(selectCurrentNotificationsPage);
	const isNotificationsLoaded = useSelector(selectIsNotificationsLoaded);
	const userNotifications = useSelector(selectNotifications);
	const totalNumberOfNotifications = useSelector(selectTotalNumberOfNotifications);
	
	const getAllNotifications = useGetAllNotifications();
	const getUserId = useGetUserId();

	const modalRef = useRef(null);
	
	const [userId, setUserId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [displayNotifications, setDisplayNotifications] = useState([]);
	const [isNotificationsHasBeenCalled, setIsNotificationsHasBeenCalled] =
		useState(false);

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const checkNotifications = async () => {
		if (!isNotificationsHasBeenCalled) {
			await getId();
			setIsNotificationsHasBeenCalled(true);
		}
	};

	useEffect(() => {
		if (openNotificationsModal) {
			checkNotifications();
		}
	}, [openNotificationsModal]);

	useEffect(() => {
		if (!isNotificationsLoaded && currentPage) {
			if (userId) getAllNotifications(userId, currentPage, 10);
		}
	}, [userId]);

	useEffect(() => {
		if (userId && currentPage) getAllNotifications(userId, currentPage, 10);
	}, [currentPage]);

	useEffect(() => {
		setDisplayNotifications(userNotifications);
	}, [userNotifications]);

	useEffect(() => {
		const pages = Math.ceil(totalNumberOfNotifications / 10);
		setTotalPages(pages);
	}, [totalNumberOfNotifications]);

	useEffect(() => {
		if (currentNotifications) setCurrentPage(currentNotifications);
	}, [currentNotifications]);

	useEffect(() => {
        const currentModal = modalRef.current;
        if (currentModal) {
            currentModal.style.animation = `${isClosingModal ? 'slideOutNotif' : 'slideInNotif'} 0.3s forwards`;
        }
    }, [isClosingModal]);

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={handleNotificationsModal}>
			<div
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin mt-20 rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md lg:w-modal-lg xl:w-modal-xl pb-2"
				onClick={(e) => e.stopPropagation()} ref={modalRef}>
				<div className="overflow-y-auto max-h-[500px]">
					{displayNotifications &&
					displayNotifications.length === 0 ? (
						<div className="px-4 pb-2.5 text-sm text-gray-600">
							Aucune nouvelle notification
						</div>
					) : (
						<ul>
							<p className="px-4 py-2.5 text-xs font-semibold text-gray-600">
								NOTIFICATIONS
							</p>
							{displayNotifications &&
								displayNotifications.map((notification) => (
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
										<div className="flex flex-1 items-start space-x-2">
											<div className="bg-dark-blue-2 flex h-9 items-center justify-center mx-auto overflow-hidden relative rounded-full w-9">
												<AvatarContact user={notification} />
											</div>
											<div className="flex-1">
												<span className="block">
													{notification.message}
												</span>
												<span className="block text-xs text-gray-400 mt-1">
													{formatDateToNow(
														notification.createdAt
													)}
												</span>
											</div>
										</div>
									</li>
								))}
						</ul>
					)}
				</div>
				{totalPages && totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						setPage={setCurrentPage}
						totalPages={totalPages}
					/>
				)}
			</div>
		</section>
	);
};

export default NotificationsModal;
