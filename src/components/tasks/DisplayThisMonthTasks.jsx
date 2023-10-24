import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisMonthTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayThisMonthTasks = ({ setSelectedTask, openModal }) => {
	const userThisMonthTasks = useSelector(selectThisMonthTasks);
	const [displayThisMonthTasks, setDisplayThisMonthTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-month-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisMonthTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisMonthTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayThisMonthTasks(sortedTasks);
		};

		updateDisplayThisMonthTasks();
	}, [userThisMonthTasks]);

	return (
		<>
			{displayThisMonthTasks.filter(
				(task) => task.category === 'this-month-tasks'
			).length > 0 && (
				<div
					id="this-month-tasks"
					className={`task-block ${
						expandedBlocks['this-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-month-tasks')}>
					<div className="task-block-header">
						<h3>Ce mois-ci</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-month-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayThisMonthTasks &&
						displayThisMonthTasks?.length > 0
							? displayThisMonthTasks
									.filter(
										(task) =>
											task.category === 'this-month-tasks'
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

export default DisplayThisMonthTasks;
