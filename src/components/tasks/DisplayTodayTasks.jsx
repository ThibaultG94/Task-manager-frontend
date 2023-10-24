import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { sortTasks } from '../utils/sortTasks';
import { selectTodayTasks } from '../../store/selectors/taskSelectors';

const DisplayTodayTasks = ({ setSelectedTask, openModal }) => {
	const userTodayTasks = useSelector(selectTodayTasks);
	const [displayTodayTasks, setDisplayTodayTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'today-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayTodayTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(userTodayTasks, workspaces, updatedTasks);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayTodayTasks(sortedTasks);
		};

		updateDisplayTodayTasks();
	}, [userTodayTasks]);

	return (
		<>
			{displayTodayTasks.filter((task) => task.category === 'today-tasks')
				.length > 0 && (
				<div
					id="today-tasks"
					className={`task-block ${
						expandedBlocks['today-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('today-tasks')}>
					<div className="task-block-header">
						<h3>Aujourd'hui</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('today-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayTodayTasks && displayTodayTasks?.length > 0
							? displayTodayTasks
									.filter(
										(task) =>
											task.category === 'today-tasks'
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

export default DisplayTodayTasks;
