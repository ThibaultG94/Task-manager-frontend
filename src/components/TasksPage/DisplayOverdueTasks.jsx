import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { updateDisplayTasks } from '../../utils/updateDisplayTasks';
import HeaderBlock from './HeaderBlock';
import TaskItem from './TaskItem';

const DisplayOverdueTasks = ({
	setSelectedTask,
	openModal,
	allTasks,
	expandedBlocks,
	setExpandedBlocks,
}) => {
	const workspaces = useSelector(selectWorkspaces);

	const [displayOverdueTasks, setDisplayOverdueTasks] = useState([]);

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
				allTasks.userOverdueTasks,
				workspaces,
				updatedTasks
			);
			setDisplayOverdueTasks(updatedTasks);
		};

		updateDisplayOverdueTasks();
	}, [allTasks.userOverdueTasks]);

	return (
		<>
			{allTasks.userOverdueTasks.length > 0 && (
				<div
					className={`bg-red-error-overdue font-medium mb-4 rounded-md text-red-error-2 ${
						expandedBlocks['retard-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('retard-tasks')}>
					<HeaderBlock
						label={'Retard'}
						type={'retard-tasks'}
						toggleBlock={toggleBlock}
					/>

					<div
						className="task-list"
						onClick={(e) => e.stopPropagation()}>
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
