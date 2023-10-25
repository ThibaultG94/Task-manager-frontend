import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBecomingTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayBecomingTasks = ({ setSelectedTask, openModal }) => {
	const userBecomingTasks = useSelector(selectBecomingTasks);
	const [displayBecomingTasks, setDisplayBecomingTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'becoming-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayBecomingTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userBecomingTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayBecomingTasks(sortedTasks);
		};

		updateDisplayBecomingTasks();
	}, [userBecomingTasks]);

	return (
		<>
			{userBecomingTasks.length > 0 && (
				<div
					id="becoming-tasks"
					className={`task-block ${
						expandedBlocks['becoming-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('becoming-tasks')}>
					<div className="task-block-header">
						<h3>Prochaines années</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('becoming-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayBecomingTasks &&
						displayBecomingTasks?.length > 0
							? displayBecomingTasks
									.filter(
										(task) =>
											task.category === 'becoming-tasks'
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

export default DisplayBecomingTasks;
