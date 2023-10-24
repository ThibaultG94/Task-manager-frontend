import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNextMonthTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayNextMonthTasks = ({ setSelectedTask, openModal }) => {
	const userNextMonthTasks = useSelector(selectNextMonthTasks);
	const [displayNextMonthTasks, setDisplayNextMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'next-month-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayNextMonthTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userNextMonthTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayNextMonthTasks(sortedTasks);
		};

		updateDisplayNextMonthTasks();
	}, [userNextMonthTasks]);

	return (
		<>
			{displayNextMonthTasks.filter(
				(task) => task.category === 'next-month-tasks'
			).length > 0 && (
				<div
					id="next-month-tasks"
					className={`task-block ${
						expandedBlocks['next-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-month-tasks')}>
					<div className="task-block-header">
						<h3>Mois prochain</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-month-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayNextMonthTasks &&
						displayNextMonthTasks?.length > 0
							? displayNextMonthTasks
									.filter(
										(task) =>
											task.category === 'next-month-tasks'
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

export default DisplayNextMonthTasks;
