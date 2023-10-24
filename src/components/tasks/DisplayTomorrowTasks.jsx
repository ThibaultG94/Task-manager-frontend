import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { sortTasks } from '../utils/sortTasks';
import { selectTomorrowTasks } from '../../store/selectors/taskSelectors';

const DisplayTomorrowTasks = ({ setSelectedTask, openModal }) => {
	const userTomorrowTasks = useSelector(selectTomorrowTasks);
	const [displayTomorrowTasks, setDisplayTomorrowTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'tomorrow-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayTomorrowTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userTomorrowTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayTomorrowTasks(sortedTasks);
		};

		updateDisplayTomorrowTasks();
	}, [userTomorrowTasks]);

	return (
		<>
			{displayTomorrowTasks.filter(
				(task) => task.category === 'tomorrow-tasks'
			).length > 0 && (
				<div
					id="tomorrow-tasks"
					className={`task-block ${
						expandedBlocks['tomorrow-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('tomorrow-tasks')}>
					<div className="task-block-header">
						<h3>Demain</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('tomorrow-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayTomorrowTasks &&
						displayTomorrowTasks?.length > 0
							? displayTomorrowTasks
									.filter(
										(task) =>
											task.category === 'tomorrow-tasks'
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
			)}
		</>
	);
};

export default DisplayTomorrowTasks;
