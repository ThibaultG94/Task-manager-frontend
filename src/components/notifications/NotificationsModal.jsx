import React, { useState } from 'react';
import { useGetAllNotifications } from '../../api/notifications/getAllNotifications';
import { useSelector } from 'react-redux';
import {
	selectIsNotificationsLoaded,
	selectNotifications,
	selectTotalNotifications,
} from '../../store/selectors/notificationSelectors';
import { selectCurrentNotificationsPage } from '../../store/selectors/pagesSelectors';

const NotificationsModal = ({ handleNotificationsModal }) => {
	const getAllNotifications = useGetAllNotifications();
	const currentNotifications = useSelector(selectCurrentNotificationsPage);
	const userNotifications = useSelector(selectNotifications);
	const totalNotifications = useSelector(selectTotalNotifications);
	const isNotificationsLoaded = useSelector(selectIsNotificationsLoaded);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [notifications, setNotifications] = useState([]);
	const [displayNotifications, setDisplayNotifications] = useState([]);
	const [isNotificationsHasBeenCalled, setIsNotificationsHasBeenCalled] =
		useState(false);

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={handleNotificationsModal}>
			<div
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-72 sm:min-w-96 w-3/4 max-w-max"
				onClick={(e) => e.stopPropagation()}>
				<div className="overflow-y-auto max-h-96">
					{notifications && notifications.length === 0 ? (
						<div className="px-4 pb-2.5 text-sm text-gray-600">
							Aucune nouvelle notification
						</div>
					) : (
						<ul>
							{notifications &&
								notifications.map((notification, index) => (
									<li
										key={index}
										// Reste du style ici...
									>
										// Affichage de la notification...
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};

export default NotificationsModal;
