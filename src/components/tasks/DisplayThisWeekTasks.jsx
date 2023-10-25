import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { sortTasks } from '../utils/sortTasks';
import { selectThisWeekTasks } from '../../store/selectors/taskSelectors';

const DisplayThisWeekTasks = ({ setSelectedTask, openModal }) => {
	const userThisWeekTasks = useSelector(selectThisWeekTasks);
	const [displayThisWeekTasks, setDisplayThisWeekTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-week-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisWeekTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisWeekTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayThisWeekTasks(sortedTasks);
		};

		updateDisplayThisWeekTasks();
	}, [userThisWeekTasks]);

	return (
		<>
			{userThisWeekTasks.length > 0 && (
				<div
					id="this-week-tasks"
					className={`task-block ${
						expandedBlocks['this-week-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-week-tasks')}>
					<div className="task-block-header">
						<h3>Cette semaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-week-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayThisWeekTasks &&
						displayThisWeekTasks?.length > 0
							? displayThisWeekTasks
									.filter(
										(task) =>
											task.category === 'this-week-tasks'
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

export default DisplayThisWeekTasks;
