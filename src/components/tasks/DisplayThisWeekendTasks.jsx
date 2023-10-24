import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectThisWeekendTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { sortTasks } from '../utils/sortTasks';

const DisplayThisWeekendTasks = ({ setSelectedTask, openModal }) => {
	const userThisWeekendTasks = useSelector(selectThisWeekendTasks);
	const [displayThisWeekendTasks, setDisplayThisWeekendTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-weekend-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayThisWeekendTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userThisWeekendTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayThisWeekendTasks(sortedTasks);
		};

		updateDisplayThisWeekendTasks();
	}, [userThisWeekendTasks]);

	return (
		<>
			{displayThisWeekendTasks.filter(
				(task) => task.category === 'this-weekend-tasks'
			).length > 0 && (
				<div
					id="this-weekend-tasks"
					className={`task-block ${
						expandedBlocks['this-weekend-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-weekend-tasks')}>
					<div className="task-block-header">
						<h3>Ce Weekend</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-weekend-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayThisWeekendTasks &&
						displayThisWeekendTasks?.length > 0
							? displayThisWeekendTasks
									.filter(
										(task) =>
											task.category ===
											'this-weekend-tasks'
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

export default DisplayThisWeekendTasks;
