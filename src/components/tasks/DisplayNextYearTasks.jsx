import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNextYearTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayNextYearTasks = ({ setSelectedTask, openModal }) => {
	const userNextYearTasks = useSelector(selectNextYearTasks);
	const [displayNextYearTasks, setDisplayNextYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'next-year-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextYearTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayNextYearTasks(sortedTasks);
		};

		updateDisplayNextYearTasks();
	}, [userNextYearTasks]);

	return (
		<>
			{displayNextYearTasks.filter(
				(task) => task.category === 'next-year-tasks'
			).length > 0 && (
				<div
					id="next-year-tasks"
					className={`task-block ${
						expandedBlocks['next-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-year-tasks')}>
					<div className="task-block-header">
						<h3>Année prochaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-year-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayNextYearTasks &&
						displayNextYearTasks?.length > 0
							? displayNextYearTasks
									.filter(
										(task) =>
											task.category === 'next-year-tasks'
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

export default DisplayNextYearTasks;
