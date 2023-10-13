import React, { useEffect, useState } from 'react';
import { useGetArchivedTasks } from '../../api/getArchivedTasks';
import { useSelector } from 'react-redux';
import { selectArchivedTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import getUserId from '../../api/getUserId';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';

const DisplayArchivedTasks = ({ setSelectedTask, openModal }) => {
	const [userId, setUserId] = useState(null);
	const getArchivedTasks = useGetArchivedTasks();
	const [isArchivedTasksHasBeenCalled, setIsArchivedTasksHasBeenCalled] =
		useState(false);
	const userArchivedTasks = useSelector(selectArchivedTasks);
	const [displayArchivedTasks, setDisplayArchivedTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

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
		if (userId) getArchivedTasks(userId);
	}, [userId]);

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

	return (
		<>
			<div
				id="archived-tasks"
				className={`task-block ${
					expandedBlocks['archived-tasks'] ? 'expanded' : ''
				}`}
				onClick={() => toggleBlock('archived-tasks')}>
				<div className="task-block-header">
					<h3>Archives</h3>
					<button
						className="toggle-button"
						onClick={(e) => {
							e.stopPropagation();
							toggleBlock('archived-tasks');
						}}>
						▶
					</button>
				</div>
				<div className="task-list">
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
			</div>
		</>
	);
};

export default DisplayArchivedTasks;
