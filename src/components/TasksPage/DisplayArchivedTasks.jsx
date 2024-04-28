import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentArchivedPage } from '../../store/selectors/pagesSelectors';
import {
	selectArchivedTasks,
	selectIsArchivedTasksLoaded,
	selectTotalArchivedTasks,
} from '../../store/selectors/taskSelectors';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetArchivedTasks } from '../../api/tasks/getArchivedTasks';
import getUserId from '../../api/users/getUserId';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import Pagination from '../../utils/Pagination';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';
import LoadingTaskComponent from '../Buttons/LoadingTaskComponent';

const DisplayArchivedTasks = ({ setSelectedTask, openModal }) => {
	const currentArchivedTasks = useSelector(selectCurrentArchivedPage);
	const userArchivedTasks = useSelector(selectArchivedTasks);
	const totalArchivedTasks = useSelector(selectTotalArchivedTasks);
	const workspaces = useSelector(selectWorkspaces);
	const isArchivedTasksLoaded = useSelector(selectIsArchivedTasksLoaded);

	const getArchivedTasks = useGetArchivedTasks();

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [userId, setUserId] = useState(null);
	
	const [isArchivedTasksHasBeenCalled, setIsArchivedTasksHasBeenCalled] =
		useState(false);
	const [displayArchivedTasks, setDisplayArchivedTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const [expandedBlocks, setExpandedBlocks] = useState({
		'archived-tasks': false,
	});

	const checkArchivedTasks = async () => {
		if (!isArchivedTasksHasBeenCalled) {
			await getId();
			setIsArchivedTasksHasBeenCalled(true);
		}
	};

	useEffect(() => {
		isArchivedTasksLoaded ? setIsLoading(false) : setIsLoading(true);
	}, [isArchivedTasksLoaded]);

	useEffect(() => {
		if (!isArchivedTasksLoaded && currentPage) {
			if (userId) getArchivedTasks(userId, currentPage, 10);
		}
	}, [userId]);

	useEffect(() => {
		if (userId && currentPage) getArchivedTasks(userId, currentPage, 10);
	}, [currentPage]);

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});

		checkArchivedTasks();
	};

	useEffect(() => {
		const updateDisplayArchivedTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userArchivedTasks,
				workspaces,
				updatedTasks
			);
			setDisplayArchivedTasks(updatedTasks);
		};

		updateDisplayArchivedTasks();
	}, [userArchivedTasks]);

	useEffect(() => {
		const pages = Math.ceil(totalArchivedTasks / 10);
		setTotalPages(pages);
	}, [totalArchivedTasks]);

	useEffect(() => {
		if (currentArchivedTasks) setCurrentPage(currentArchivedTasks);
	}, [currentArchivedTasks]);

	return (
		<div
			id="archived-tasks"
			className={`mb-4 rounded-md bg-white ${
				expandedBlocks['archived-tasks'] ? 'expanded' : ''
			}`}
			onClick={() => toggleBlock('archived-tasks')}>
			<HeaderBlock
				label={'Archives'}
				type={'archived-tasks'}
				toggleBlock={toggleBlock}
			/>

			{isLoading && expandedBlocks['archived-tasks'] ? (
				<LoadingTaskComponent />
			) : (
				<div className="task-list" onClick={(e) => e.stopPropagation()}>
					{displayArchivedTasks && displayArchivedTasks?.length > 0
						? displayArchivedTasks
								.filter(
									(task) => task.category === 'archived-tasks'
								)
								.map((task, index) => (
									<TaskItem
										task={task}
										openModal={openModal}
										key={index}
										setSelectedTask={setSelectedTask}
									/>
								))
						: null}
				</div>
			)}
			{expandedBlocks && expandedBlocks['archived-tasks'] ? (
				<Pagination
					currentPage={currentPage}
					setPage={setCurrentPage}
					totalPages={totalPages}
				/>
			) : null}
		</div>
	);
};

export default DisplayArchivedTasks;
