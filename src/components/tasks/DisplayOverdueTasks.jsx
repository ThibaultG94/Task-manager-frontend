import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectOverdueTasks } from '../../store/selectors/taskSelectors';
import HeaderBlock from './HeaderBlock';

const DisplayOverdueTasks = ({ setSelectedTask, openModal }) => {
	const userOverdueTasks = useSelector(selectOverdueTasks);
	const [displayOverdueTasks, setDisplayOverdueTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'retard-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayOverdueTasks = async () => {
			const updatedTasks = [];
			await updateDisplayTasks(
				userOverdueTasks,
				workspaces,
				updatedTasks
			);
			setDisplayOverdueTasks(updatedTasks);
		};

		updateDisplayOverdueTasks();
	}, [userOverdueTasks]);

	return (
		<>
			{userOverdueTasks.length > 0 && (
				<div
					id="retard-tasks"
					className={`task-block ${
						expandedBlocks['retard-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('retard-tasks')}>
					<HeaderBlock
						label={'Retard'}
						type={'retard-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div className="task-list">
						{displayOverdueTasks && displayOverdueTasks?.length > 0
							? displayOverdueTasks
									.filter(
										(task) =>
											task.category === 'retard-tasks'
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

export default DisplayOverdueTasks;
