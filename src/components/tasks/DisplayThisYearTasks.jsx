import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisYearTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayThisYearTasks = ({ setSelectedTask, openModal }) => {
	const userThisYearTasks = useSelector(selectThisYearTasks);
	const [displayThisYearTasks, setDisplayThisYearTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-year-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisYearTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisYearTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayThisYearTasks(sortedTasks);
		};

		updateDisplayThisYearTasks();
	}, [userThisYearTasks]);

	return (
		<>
			{userThisYearTasks.length > 0 && (
				<div
					id="this-year-tasks"
					className={`task-block ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<div className="task-block-header">
						<h3>Cette année</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-year-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayThisYearTasks &&
						displayThisYearTasks?.length > 0
							? displayThisYearTasks
									.filter(
										(task) =>
											task.category === 'this-year-tasks'
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

export default DisplayThisYearTasks;
