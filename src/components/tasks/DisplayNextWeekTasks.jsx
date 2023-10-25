import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNextWeekTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';

const DisplayNextWeekTasks = ({ setSelectedTask, openModal }) => {
	const userNextWeekTasks = useSelector(selectNextWeekTasks);
	const [displayNextWeekTasks, setDisplayNextWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'next-week-tasks': false,
		'next-weekend-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextWeekTasks,
				workspaces,
				updatedTasks
			);
			setDisplayNextWeekTasks(updatedTasks);
		};

		updateDisplayNextWeekTasks();
	}, [userNextWeekTasks]);

	return (
		<>
			{userNextWeekTasks.length > 0 && (
				<div
					id="next-week-tasks"
					className={`task-block ${
						expandedBlocks['next-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-week-tasks')}>
					<div className="task-block-header">
						<h3>Semaine prochaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-week-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayNextWeekTasks &&
						displayNextWeekTasks?.length > 0
							? displayNextWeekTasks
									.filter(
										(task) =>
											task.category === 'next-week-tasks'
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

export default DisplayNextWeekTasks;
