import React, { useEffect, useState } from 'react';
import { useGetArchivedTasks } from '../../api/tasks/getArchivedTasks';
import { useSelector } from 'react-redux';
import {
	selectArchivedTasks,
	selectIsArchivedTasksLoaded,
	selectTotalArchivedTasks,
} from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import getUserId from '../../api/users/getUserId';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import HeaderBlock from './HeaderBlock';
import Pagination from '../../utils/Pagination';
import { selectCurrentArchivedPage } from '../../store/selectors/pagesSelectors';

const DisplayArchivedTasks = ({ setSelectedTask, openModal }) => {
	const currentArchivedTasks = useSelector(selectCurrentArchivedPage);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [userId, setUserId] = useState(null);
	const getArchivedTasks = useGetArchivedTasks();
	const [isArchivedTasksHasBeenCalled, setIsArchivedTasksHasBeenCalled] =
		useState(false);
	const userArchivedTasks = useSelector(selectArchivedTasks);
	const totalArchivedTasks = useSelector(selectTotalArchivedTasks);
	const [displayArchivedTasks, setDisplayArchivedTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);
	const isArchivedTasksLoaded = useSelector(selectIsArchivedTasksLoaded);

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
