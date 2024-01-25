import React, { useEffect, useState } from 'react';
import { useGetAllNotifications } from '../../api/notifications/getAllNotifications';
import { useSelector } from 'react-redux';
import {
	selectIsNotificationsLoaded,
	selectNotifications,
	selectTotalNotifications,
} from '../../store/selectors/notificationSelectors';
import { selectCurrentNotificationsPage } from '../../store/selectors/pagesSelectors';
import getUserId from '../../api/users/getUserId';
import Pagination from '../tasks/Pagination';

const NotificationsModal = ({
	handleNotificationsModal,
	openNotificationsModal,
}) => {
	const getAllNotifications = useGetAllNotifications();
	const currentNotifications = useSelector(selectCurrentNotificationsPage);
	const userNotifications = useSelector(selectNotifications);
	const totalNotifications = useSelector(selectTotalNotifications);
	const isNotificationsLoaded = useSelector(selectIsNotificationsLoaded);
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
		const pages = Math.ceil(totalNotifications / 10);
		setTotalPages(pages);
	}, [totalNotifications]);

	useEffect(() => {
		if (currentNotifications) setCurrentPage(currentNotifications);
	}, [currentNotifications]);

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={handleNotificationsModal}>
			<div
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-72 sm:min-w-96 w-3/4 max-w-max"
				onClick={(e) => e.stopPropagation()}>
				<div className="overflow-y-auto max-h-96">
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
										className={`px-4 py-2 h-16 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex ${
											notification.read
												? 'opacity-50'
												: ''
										} ${
											!notification.viewedAt
												? 'bg-gray-100'
												: ''
										}`}
										// onClick={() => onRead(notification)}
									>
										<div className="flex items-center">
											<div className="bg-dark-blue cursor-auto flex h-10 items-center justify-center mx-auto overflow-hidden p-4 relative rounded-full w-10 mr-2">
												<span id="avatarLetterNotif">
													{
														notification
															.creatorUsername[0]
													}
												</span>
											</div>
										</div>
										<div className="flex items-center">
											<span className="flex-grow multi-line-truncate">
												{notification.message}
											</span>
										</div>
									</li>
								))}
						</ul>
					)}
				</div>
				<Pagination
					currentPage={currentPage}
					setPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</div>
		</section>
	);
};

export default NotificationsModal;
